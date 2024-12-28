
// Controller for handling Company sign in
const { Company } = require('../../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse, customResponse, notFoundResponse } = require('../../../utils/response');
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

    // Check if company exists
    const company = await Company.findOne({
      where: { email }
    });
    if (!company) {
      return notFoundResponse(res, 'Company not found')
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return customResponse(res, 401, false, 'Invalid credentials', null)
    }

    // Generate JWT token
    const token = jwt.sign(
      { companyId: company.uuid, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return company info and token
    return successResponse(res, 'Company signed in successfully', { companyId: company.uuid, token, email: company.email })

  } catch (error) {

    return errorResponse(res)
  }
};

module.exports = signIn;