import { db } from "../config/database.js";
import bcrypt from "bcrypt";

export async function signup(_, res) {
  const { email, password, name } = res.locals.value;
  try {
    const userExists = await db.query(
      'select * from "user" where "email" = $1',
      [email]
    );
    if (userExists.rowCount !== 0) return res.sendStatus(409);
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      ` 
        INSERT INTO "user"
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
