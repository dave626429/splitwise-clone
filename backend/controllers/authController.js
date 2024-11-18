import UserServices from "../services/usersServices.js";
import { signJWT } from "../utils/jwt.js";

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

    const token = signJWT(user._id);

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.cookie("identity", user._id, { httpOnly: true, secure: false });

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

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("identity");
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
};

export const isSessionValid = async (req, res) => {
  console.log(req.cookies);
  if (!req.cookies.token) return res.status(200).send(false);
  res.status(200).send(true);
};
