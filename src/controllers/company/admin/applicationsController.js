const { Applications } = require("../../../../models");
const { successResponse, errorResponse } = require("../../../utils/response");

// Controller to list all applications
const listApplications = async (req, res) => {
  try {
    const applications = await Applications.findAll();

    return successResponse(res, "Fetched Successfully", applications);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  listApplications,
};
