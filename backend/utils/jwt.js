import jwt from "jsonwebtoken";

export const signJWT = (userID) => {
  const { JWT_SECRET, JWT_EXPIRY } = process.env;

  try {
    const token = jwt.sign(
      {
        userID,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = (token) => {
  const { JWT_SECRET } = process.env;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};
