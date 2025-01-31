// Controller for managing user operations
const { User, Profile } = require("../../../../models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
} = require("../../../utils/response");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: "user" } });
    return successResponse(res, "fetched successfully", {
      users,
      count: users.length,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete related records in the profiles table first
    await Profile.destroy({ where: { userId: id } });

    // Then delete the user
    const deletedUser = await User.findByPk(id);

    if (!deletedUser) {
      return notFoundResponse(res, "User not found");
    }

    await deletedUser.destroy();
    return successResponse(res, "User deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
