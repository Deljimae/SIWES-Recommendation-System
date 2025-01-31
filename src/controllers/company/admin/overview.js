const { successResponse, errorResponse } = require("../../../utils/response");
const { User, Company, Applications } = require("./.././../../../models");
const { Op } = require("sequelize");
// Controller to get total counts for applications, users, and companies
const getOverview = async (req, res) => {
  try {
    const totalApplications = await Applications.count();
    // Count all users except admins
    const totalUsers = await User.count({
      where: {
        role: {
          [Op.ne]: "admin", // Using Op.ne operator for not equal comparison
        },
      },
    });
    const totalCompanies = await Company.count();
    return successResponse(res, "Fetched Successfully", {
      totalApplications,
      totalUsers,
      totalCompanies,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getOverview,
};
