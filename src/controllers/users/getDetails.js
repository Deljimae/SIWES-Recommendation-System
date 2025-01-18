
// Import required dependencies
const { Profile, User } = require('../../../models');
const { successResponse, errorResponse, notFoundResponse } = require('../../utils/response');

// Controller to get user details
const getUserDetails = async (req, res) => {
  try {
    // Get user ID from request params or auth token
    const { userId } = req.user;

    // Find user profile by ID
    const userProfile = await User.findOne({
      where: { uuid: userId },
      include: { model: Profile, as: 'Profile' },
    }); // Populate basic user fields

    if (!userProfile) {
      notFoundResponse(res, 'User profile not found');
    }

    return successResponse(res, 'User details retrieved successfully', userProfile)

  } catch (err) {
    console.error(err.message);
    errorResponse(res, 'Error getting user details', 500);
  }
};

module.exports = getUserDetails;