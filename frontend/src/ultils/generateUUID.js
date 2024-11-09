import { v4 } from "uuid";

export const generateElementKey = (key) => {
  if (key) return `${key}-${v4()}`;
  return v4();
};

export const generateId = () => {
  return v4();
};
