import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import router from "./routers/routes.js";
import { connectMongoDB } from "./services/dbServices.js";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const app = express();

// handles req.body
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", router);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`The backend started at PORT : ${PORT}`);
  connectMongoDB();
});
