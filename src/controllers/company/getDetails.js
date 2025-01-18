const { Company } = require('../../../models');
const { notFoundResponse, successResponse, errorResponse, customResponse } = require('../../utils/response');
// Controller to fetch company details by UUID
const getCompanyDetails = async (req, res) => {
  try {
    const { uuid } = req.params;

    // Validate UUID parameter
    if (!uuid) {
      return customResponse(res, 400, false, 'Company UUID is required')
    }

    // Query database for company with matching UUID
    const company = await Company.findOne({
      where: { uuid }
    });

    // Check if company exists
    if (!company) {
      return notFoundResponse(res, 'Company not found')
    }

    // Return company details
    return successResponse(res, 'Company details retrieved successfully', company)

  } catch (error) {
    errorResponse(res, 'Error retrieving company details', 500)
  }
};

module.exports = getCompanyDetails;