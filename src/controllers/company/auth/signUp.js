// Controller for handling company signup
const { Company } = require('../../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse, customResponse, alreadyExistResponse, successResponse } = require('../../../utils/response');
const joi = require('joi');
require('dotenv').config()

const signUp = async (req, res) => {
  try {
    // Validate the request body
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      companyName: joi.string().required(),
      registrationNumber: joi.string().required(),
      address: joi.string().required(),
      contactPhone: joi.string().required(),
      industry: joi.string().required()
    }).validate(req.body);

    if (schema.error) {
      return errorResponse(res, schema.error.details[0].message, 400);
    }

    const { email, password, companyName, registrationNumber, address, contactPhone, industry } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Try to create the company
    const [company, created] = await Company.findOrCreate({
      where: { email },
      defaults: {
        company_name: companyName,
        registrationNumber,
        address,
        contactPhone,
        industry,
        password: hashedPassword,
      }
    });

    if (!created) {
      return alreadyExistResponse(res, 'Company already exists');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { companyId: company.uuid },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and company details
    // Exclude password from the response
    const companyWithoutPassword = company.toJSON();
    delete companyWithoutPassword.password;

    return successResponse(
      res,
      'Company created successfully',
      { token, company: companyWithoutPassword }
    );

  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message);
  }
};

module.exports = signUp;