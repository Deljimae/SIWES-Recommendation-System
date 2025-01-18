
// Controller for handling user sign in
const { User } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse, customResponse, notFoundResponse } = require('../../utils/response');
const joi = require('joi');
const { where } = require('sequelize');

const signIn = async (req, res) => {
  try {

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return errorResponse(res, error.details[0].message, 400);
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      return notFoundResponse(res, 'User not found')
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return customResponse(res, 401, false, 'Invalid credentials', null)
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.uuid, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return user info and token
    return successResponse(res, 'User signed in successfully', { userId: user.uuid, token, email: user.email })

  } catch (error) {
    console.log(error)
    return errorResponse(res)
  }
};

module.exports = signIn;