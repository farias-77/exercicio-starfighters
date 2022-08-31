import express from "express";
import { bodyValidation } from "../middlewares/starMiddleware.js";
import { postBattle } from "../controllers/starController.js";

const router = express.Router();

router.post("/battle", bodyValidation, postBattle);
router.get("/ranking", (req, res) => {
    res.send("em desenvolvimento...")
})

export default router;