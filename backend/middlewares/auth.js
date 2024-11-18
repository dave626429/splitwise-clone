import { verifyJWT } from "../utils/jwt";

export const authenticateJWT = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { token, identity } = req.cookies;

  try {
    const decoded = verifyJWT(token, JWT_SECRET);
    if (identity === decoded.identity) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
