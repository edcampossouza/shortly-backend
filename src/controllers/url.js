import { db } from "../config/database.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();

const SHORT_URL_SIZE = process.env.SHORT_URL_SIZE || 8;

export async function shortenUrl(_, res) {
  const { url } = res.locals.value;
  const { id: userId } = res.locals.user;
  try {
    // get a nanoid and make sure it is not used yet
    let candidateId;
    let exists = false;
    do {
      candidateId = nanoid(SHORT_URL_SIZE);
      const nano = await db.query(
        'SELECT "shortUrl" FROM "url" WHERE "shortUrl" = $1',
        [candidateId]
      );
      exists = nano.rowCount !== 0;
    } while (exists);

    // insert into db
    await db.query(
      `
        INSERT INTO "url" ( "user", "shortUrl", "url" )
        VALUES ( $1, $2, $3 )
        `,
      [userId, candidateId, url]
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
