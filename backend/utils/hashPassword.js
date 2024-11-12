import { genSaltSync, hashSync, compareSync } from "bcrypt";

export function hashPassword(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export function validateHashedPassword(password, hashedPassword) {
  return compareSync(password, hashedPassword);
}
