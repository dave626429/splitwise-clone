import { Router } from "express";
// import { sendMail } from "./services/mailServices.js";

const router = Router();

router.get("/send", async (req, res) => {
  try {
    const result = await sendMail(
      "davindersingh626429+nodemailertest@gmail.com"
    );

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
