// Controller for managing user operations
const { User } = require("../../../../models");
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
    const deletedUser = await User.findByPk(id);

    if (!deletedUser) {
      return notFoundResponse(res, "User not found");
    }

    await deleteUser.destroy();

    return successResponse(res, "User deleted successfully", deletedUser);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
