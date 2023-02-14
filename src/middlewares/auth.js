import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export async function protectRoute(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  let userExists = null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    userExists = await db.query(
      `SELECT "name", "email" FROM "user" where id = $1`,
      [payload.id]
    );
  } catch (error) {
    console.log(error.message);
  }
  if (!userExists || userExists.rowCount < 1) return res.sendStatus(401);
  res.locals.user = userExists.rows[0];
  next();
}
