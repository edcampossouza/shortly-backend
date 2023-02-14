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
    
    // get inserted id
    const insertedUrl = await db.query(
      `
      SELECT "id"
      FROM "url"
      WHERE "shortUrl" = $1
      `,
      [candidateId]
    );

    return res
      .status(201)
      .send({ id: insertedUrl.rows[0].id, shortUrl: candidateId });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const urlExists = await db.query(
      'SELECT "id", "shortUrl", "url" FROM "url" WHERE "id" = $1 ',
      [id]
    );
    if (urlExists.rowCount < 1) return res.sendStatus(404);
    return res.status(200).send(urlExists.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function getUrlByShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlExists = await db.query(
      `SELECT * FROM "url" WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    if (urlExists.rowCount < 1) return res.sendStatus(404);
    const foundUrl = urlExists.rows[0];
    await db.query(
      'UPDATE "url" SET "visitCount" = "visitCount" + 1 WHERE id = $1',
      [foundUrl.id]
    );
    return res.redirect(foundUrl.url);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id: urlId } = req.params;
  const { id: userId } = res.locals.user;
  try {
    // query url by id
    const urlExists = await db.query(
      'SELECT "user" FROM "url" WHERE "id" = $1',
      [urlId]
    );

    // url id not fount
    if (urlExists.rowCount < 1) return res.sendStatus(404);
    const urlFound = urlExists.rows[0];

    // url belongs to another user
    if (urlFound.user !== userId) return res.sendStatus(401);

    // delete
    await db.query('DELETE FROM "url" WHERE "id" = $1', [urlId]);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
