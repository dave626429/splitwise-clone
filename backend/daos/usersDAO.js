import Users from "../models/usersModel.js";

/**
 * @description Creates a new user and saves it to the database.
 *
 * @param {Object} user - The details of the user to be created.
 * @param {String} user.first_name - The first name of the user.
 * @param {String} user.last_name - The last name of the user.
 * @param {String} user.email - The email address of the user.
 * @param {String} user.password - The password for the user.
 * @param {Number} user.phone - The phone number of the user.
 * @returns {Promise<Object>} The newly created user object.
 * @throws {Error} - Throws an error if user creation fails.
 */
async function create(user) {
  try {
    const newUser = await new Users(user).save();
    return newUser;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Finds a user by their email.
 *
 * @param {String} email - The email address of the user.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @throws {Error} - Throws an error if the query fails.
 */
async function findByEmail(email) {
  try {
    const user = await Users.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Finds a user by their phone number.
 *
 * @param {String} phone - The phone number of the user.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @throws {Error} - Throws an error if the query fails.
 */
async function findByPhone(phone) {
  try {
    const user = await Users.findOne({ phone });
    return user;
  } catch (error) {
    throw error;
  }
}

export default { create, findByEmail, findByPhone };
