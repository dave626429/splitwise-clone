import express from "express";
import { config } from "dotenv";
import { sendMail } from "./services/mailServices.js";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const app = express();

const { PORT } = process.env;
console.log(PORT);

app.get("/send", async (req, res) => {
  try {
    const result = await sendMail(
      "davindersingh626429+nodemailertest@gmail.com"
    );

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`The backend started at PORT : ${PORT}`);
});
