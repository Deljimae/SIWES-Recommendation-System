
// Custom response module for standardized API responses
const customResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success: success,
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  });
};

// Success response helper
const successResponse = (res, message = 'Success', data = null) => {
  return customResponse(res, 200, true, message, data);
};

// Error response helper  
const errorResponse = (res, message = 'Error occurred', statusCode = 500) => {
  return customResponse(res, statusCode, false, message);
};

// Not found response helper
const notFoundResponse = (res, message = 'Resource not found') => {
  return customResponse(res, 404, false, message);
};

// Not found response helper
const alreadyExistResponse = (res, message = 'Already Exist') => {
  return customResponse(res, 400, false, message);
};

module.exports = {
  customResponse,
  successResponse,
  errorResponse,
  notFoundResponse,
  alreadyExistResponse
};