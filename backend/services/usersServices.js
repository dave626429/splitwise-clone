import UsersDAO from "../daos/usersDao.js";
import { createError } from "../utils/createError.js";
import { hashPassword, validateHashedPassword } from "../utils/hashPassword.js";

/**
 * @description Create a new user and hashes the password before saving to the database.
 * @param {Object} userDetails - The user details to be saved.
 * @returns {Object} The created user without the password field.
 * @throws {Error} Throws an error if user creation fails.
 */
async function createUser(userDetails) {
  try {
    const hashedPassword = hashPassword(userDetails.password);

    const newUser = await UsersDAO.create({
      ...userDetails,
      password: hashedPassword,
    });

    // Remove password from the user object before returning
    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  } catch (error) {
    throw createError(error);
  }
}

/**
 * @description Validates user login based on email or phone number and password.
 * @param {string} phoneOrEmail - The phone number or email used for login.
 * @param {string} password - The password entered by the user.
 * @returns {Object} The user object without the password field if login is successful.
 * @throws {Error} Throws an error if login validation fails.
 */
async function validateLogin(phoneOrEmail, password) {
  try {
    let user;

    // Check if the input is an email or phone number and find the user
    if (phoneOrEmail.includes("@")) {
      user = await UsersDAO.findByEmail(phoneOrEmail);
      if (!user) {
        throw createError(null, {
          code: 404,
          type: "INVALID_USER",
          message: "User with this email is not registered.",
        });
      }
    } else {
      user = await UsersDAO.findByPhone(phoneOrEmail);
      if (!user) {
        throw createError(null, {
          code: 404,
          type: "INVALID_USER",
          message: "User with this phone is not registered.",
        });
      }
    }

    // Validate the password
    if (validateHashedPassword(password, user.password)) {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    }

    // If password validation fails
    throw createError(null, {
      code: 401,
      type: "AUTH_FAILED",
      message: "Incorrect password.",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default { createUser, validateLogin };
