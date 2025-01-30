// Controller for handling user sign in
const { User } = require("../../../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  errorResponse,
  successResponse,
  customResponse,
  notFoundResponse,
} = require("../../../utils/response");
const joi = require("joi");

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
      where: { email, role: "admin" },
    });
    if (!user) {
      return notFoundResponse(res, "Admin not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return customResponse(res, 401, false, "Invalid credentials", null);
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: user.uuid, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return user info and token
    return successResponse(res, "User signed in successfully", {
      userId: user.uuid,
      token,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res);
  }
};

const signUp = async (req, res) => {
  try {
    // Validate the request body
    const schema = joi
      .object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        fullName: joi.string().required(),
      })
      .validate(req.body);

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
        role: "admin",
      },
    });

    if (!created) {
      return customResponse(res, 400, false, "User already exists");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: user.uuid, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and user details
    // Exclude password from the response
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    return successResponse(res, "Admin created successfully", {
      token,
      admin: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message);
  }
};

module.exports = { signIn, signUp };
