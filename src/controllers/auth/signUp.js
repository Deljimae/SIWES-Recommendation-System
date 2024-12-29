// Controller for handling user signup
const { User, Profile } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, customResponse, alreadyExistResponse, successResponse } = require('../../utils/response');
const joi = require('joi');
require('dotenv').config()

exports.signUp = async (req, res) => {
  try {
    // Validate the request body
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      fullName: joi.string().required()
    }).validate(req.body);

    if (schema.error) {
      return errorResponse(res, schema.error.details[0].message, 400);
    }

    const { email, password, fullName } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Try to create the user
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: fullName,
        password: hashedPassword,
      }
    });

    // Create user profile in the profile table
    if (created) {
      await Profile.create({
        userId: user.uuid,
        course_of_study: '',
        interests: [],
        skills: [],
        career_goals: []
      });
    }

    if (!created) {
      return alreadyExistResponse(res, 'User already exists');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.uuid, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and user details
    // Exclude password from the response
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    return successResponse(
      res,
      'User created successfully',
      { token, user: userWithoutPassword }
    );

  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message);
  }
};
