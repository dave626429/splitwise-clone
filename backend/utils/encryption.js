import crypto from "crypto";

// Define a secret key (must be 32 bytes for AES-256)
const SECRET_KEY = crypto.randomBytes(32); // Replace with a secure, consistent key in production

// Define an initialization vector (IV) (must be 16 bytes for AES)
const IV = crypto.randomBytes(16); // Replace with a consistent IV in production, if required

// Encrypt function
const encrypt = (plainText) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, IV);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: IV.toString("hex") }; // IV must be shared for decryption
};

// Decrypt function
const decrypt = (encryptedData, ivHex) => {
  const ivBuffer = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, ivBuffer);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
