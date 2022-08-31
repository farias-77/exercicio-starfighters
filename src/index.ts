import express from "express";
import cors from "cors";
import starRouter from "./routers/starRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(starRouter);

const PORT = 5009;

app.listen(PORT, () => {
    console.log("Server on");
})
