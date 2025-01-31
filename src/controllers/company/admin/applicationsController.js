const { Applications } = require("../../../../models");
const { successResponse, errorResponse } = require("../../../utils/response");

// Controller to list all applications with company and user details
const listApplications = async (req, res) => {
  try {
    const applications = await Applications.findAll({
      include: [
        {
          model: Companies,
          as: "company",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Users,
          as: "user",
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
      ],
    });

    return successResponse(res, "Fetched Successfully", applications);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  listApplications,
};
