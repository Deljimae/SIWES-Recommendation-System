const cosineSimilarity = require('../utils/cosineSimilarity'); // Import cosine similarity function (see below)
const { User, Profile, Company } = require('../../models');
const { errorResponse, successResponse, customResponse } = require('../utils/response');
const { validate: uuidValidate } = require('uuid');
const getEmbeddingsFromPythonService = require('../services/embeddingPYService');



// bactch companies send
async function generateRecommendationsForUser(req, res) {
  const { userId } = req.user;
  const isValidUUID = uuidValidate(userId);

  if (!isValidUUID) {
    return errorResponse(res, 'Invalid UUID format', 400);
  }

  console.log('Generating recommendations for user:', userId);

  try {
    const user = await User.findOne({
      where: { uuid: userId },
      include: { model: Profile, as: 'Profile' },
    });

    if (!user) {
      return errorResponse(res, `User with ID ${userId} not found.`, 404);
    }

    if (!user.Profile || !user.Profile[0].career_goals || user.Profile[0].career_goals.length === 0) {
      console.warn(`User ${user.uuid} has no career goals.`);
      // return res.status(200).json({ message: "User has no career goals.", recommendations: [], user });
      return successResponse(res, "User has no career goals.", { recommendations: [] })
    }

    const companies = await Company.findAll();

    if (!companies || companies.length === 0) {
      console.warn("No companies found.");
      return successResponse(res, "No companies found.", { recommendations: [] })
    }

    const combinedGoals = user.Profile[0].career_goals.join(" ");

    let userEmbedding;
    try {
      const embeddingsData = await getEmbeddingsFromPythonService(combinedGoals);
      userEmbedding = embeddingsData.embeddings;
    } catch (embeddingError) {
      console.error(`Error getting user embedding for user ${user.uuid}:`, embeddingError);
      return errorResponse(res, "Error getting user embedding.", 500);
    }

    // Batch company embeddings
    const companyIndustries = companies.map(company => company.industry);
    let companyEmbeddingsData;

    try {
      companyEmbeddingsData = await getEmbeddingsFromPythonService(companyIndustries);
    } catch (embeddingError) {
      console.error("Error getting company embeddings:", embeddingError);
      return errorResponse(res, "Error getting company embeddings.", 500);
    }

    const company_embeddings = {};
    for (let i = 0; i < companies.length; i++) {
      company_embeddings[companies[i].uuid] = companyEmbeddingsData.embeddings[i];
    }

    const recommendations = [];
    const similarities = [];

    for (const company of companies) {
      if (!company_embeddings[company.uuid]) {
        console.log(`No embedding found for company: ${company.uuid}`);
        continue;
      }

      const company_embedding = company_embeddings[company.uuid];

      if (!userEmbedding) {
        console.log("User embedding is null or undefined!");
        continue;
      }

      if (!company_embedding) {
        console.log(`Company ${company.uuid} embedding is null or undefined!`);
        continue;
      }
      const score = cosineSimilarity(userEmbedding, company_embedding);
      similarities.push({ company_uuid: company.uuid, score });
    }

    const ranked_companies = similarities.sort((a, b) => b.score - a.score);
    recommendations.push({ user_uuid: user.uuid, ranked_companies });

    return successResponse(res, "Recommendations generated successfully.", { recommendations })

  } catch (error) {
    console.error("Error generating recommendations:", error);
    return customResponse(res, 500, false, 'An unexpected error occurred.', { error: error.message })
  }
}


module.exports = generateRecommendationsForUser;