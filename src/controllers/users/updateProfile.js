const { Profile } = require('../../../models');
const joi = require('joi');
const { errorResponse, successResponse } = require('../../utils/response');

/**
 * The function `updateProfile` is an asynchronous function that updates a user's profile with course
 * title and topics of interest based on the request body data.
 * @param req - The `req` parameter in the `updateProfile` function typically represents the HTTP
 * request object, which contains information about the incoming request such as headers, parameters,
 * body, etc. It is commonly used to access data sent from the client to the server. In this case, the
 * function is likely an
 * @param res - The `res` parameter in the `updateProfile` function is typically the response object in
 * an Express.js route handler. It is used to send a response back to the client making the request.
 * The response object (`res`) has methods like `res.send()`, `res.json()`, `res
 * @returns The `updateProfile` function is returning either a success response with the message
 * 'Profile updated successfully' if the profile update is successful, or an error response with the
 * error message if any error occurs during the process.
 */
const updateProfile = async (req, res) => {
  try {

    const schema = joi.object({
      courseTitle: joi.string().required(),
      topicsInterestedIn: joi.array().items(joi.string()).required()
    }).validate(req.body)

    const { error } = schema;
    if (error) {
      return errorResponse(res, error.details[0].message, 400)
    }

    const { courseTitle, topicsInterestedIn } = req.body;
    const { userId } = req.user;

    // check if user exists
    const user = await Profile.findOne({ where: { userId } })
    if (!user) {
      return errorResponse(res, 'User not found', 404)
    }

    // update the profile table
    await Profile.update({
      course_title: courseTitle,
      topics_interested_in: topicsInterestedIn
    }, {
      where: { userId }
    })

    return successResponse(res, 'Profile updated successfully')

  } catch (error) {
    return errorResponse(res, error.message)
  }

}

module.exports = updateProfile;