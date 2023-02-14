import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export async function signup(_, res) {
  const { email, password, name } = res.locals.value;
  try {
    const userExists = await db.query(
      'select * from "user_account" where "email" = $1',
      [email]
    );
    if (userExists.rowCount !== 0) return res.sendStatus(409);
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      ` 
        INSERT INTO "user_account"
        ("email", "name", "password")
        values($1, $2, $3)
      `,
      [email, name, hashedPassword]
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function signin(_, res) {
  const { email, password } = res.locals.value;
  try {
    const userExists = await db.query(
      `
        SELECT * FROM "user_account"
        where email = $1      
      `,
      [email]
    );
    if (userExists.rowCount < 1) return res.sendStatus(401);
    const theUser = userExists.rows[0];
    const matches = bcrypt.compareSync(password, theUser.password);
    if (!matches) return res.sendStatus(401);
    const token = jwt.sign({ id: theUser.id }, JWT_SECRET);
    res.status(200).send(token);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
