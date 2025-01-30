const { successResponse } = require("../../../utils/response");
const { User, Company, Applications } = require("./.././../../../models");
// Controller to get total counts for applications, users, and companies
const getOverview = async (req, res) => {
  try {
    const totalApplications = await Applications.count();
    const totalUsers = await User.count();
    const totalCompanies = await Company.count();
    return successResponse(res, "Fetched Successfully", {
      totalApplications,
      totalUsers,
      totalCompanies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting total counts",
      error: error.message,
    });
  }
};

module.exports = {
  getOverview,
};
