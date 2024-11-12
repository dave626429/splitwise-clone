/**
 * @description Centralizes error handling for various error conditions.
 *
 * @param {Error} error - The error object thrown by the throwable.
 * @param {Object} [custom] - Optional custom error object with details.
 * @param {number} [custom.code] - Optional custom status code for the response.
 * @param {"INVALID_USER" | "INVALID_TOKEN" | "NOT_FOUND"} [custom.type] - Optional custom error type for categorizing errors.
 * @param {string} [custom.message] - Optional message to be used in the response.
 * @returns {Error} The custom error with an appropriate message and status code based on the error type.
 * @throws {Error} Throws the custom error to be caught by the caller.
 */
export function createError(error, custom) {
  // MongoDB specific error for duplicate key
  if (error?.code === 11000) {
    const fieldName = Object.keys(error.keyValue)[0];

    const newError = new Error();
    newError.statusCode = 409;
    newError.message = `This ${fieldName} is already taken.`;

    return newError;
  }

  // For invalid user
  if (custom?.type === "INVALID_USER" && custom?.code === 404) {
    const newError = new Error();
    newError.statusCode = custom.code;
    newError.message = custom.message;

    return newError;
  }

  // authentication failure
  if (custom?.type === "AUTH_FAILED" && custom?.code === 401) {
    const newError = new Error();
    newError.statusCode = custom.code;
    newError.message = custom.message;

    return newError;
  }

  // Return original error if no specific handling is required
  return error;
}
