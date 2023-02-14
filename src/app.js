import express from "express";
import * as dotenv from "dotenv";
import authRouter from "./routes/auth.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening: PORT ${PORT}`));
