// Controller for managing company operations
const { Company } = require("../../../../models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
} = require("../../../utils/response");

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    return successResponse(res, "fetched successfully", {
      ...companies,
      count: companies.length,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Delete company by ID
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByPk(id);

    if (!deletedCompany) {
      return notFoundResponse(res, "Company not found");
    }

    await deletedCompany.destroy(); // Delete the company record

    return successResponse(res, "Company deleted successfully", deletedCompany);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllCompanies,
  deleteCompany,
};
