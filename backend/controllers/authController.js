import UserServices from "../services/usersServices.js";

/**
 * @description Handles user login by validating credentials.
 * @param {Object} req - The request object containing login details.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} The user details if login is successful.
 * @throws {Error} Throws an error if login fails.
 */
export async function login(req, res) {
  try {
    const { emailorphone, password } = req.body;

    const user = await UserServices.validateLogin(emailorphone, password);

    res.status(200).json({ user });
  } catch (error) {
    // Handle custom errors with status codes
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // Default error handling
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

/**
 * @description Handles user registration by creating a new user.
 * @param {Object} req - The request object containing registration details.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} The newly created user details.
 * @throws {Error} Throws an error if registration fails.
 */
export async function register(req, res) {
  try {
    const { firstname, lastname, email, password, phone } = req.body;

    const createdUser = await UserServices.createUser({
      first_name: firstname,
      last_name: lastname,
      email,
      password,
      phone,
    });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    // Handle custom errors with status codes
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // Default error handling
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
