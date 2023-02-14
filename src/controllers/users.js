import { db } from "../config/database.js";

export async function userData(_, res) {
  const { id: userId, name: userName } = res.locals.user;
  try {
    const visitCount = await db.query(
      'SELECT SUM("visitCount") AS "count" FROM "url" WHERE "user" = $1',
      [userId]
    );
    const urls = await db.query(
      'SELECT "id", "shortUrl", "url", "visitCount" FROM "url" WHERE "user" = $1',
      [userId]
    );

    const returnObj = {
      id: userId,
      name: userName,
      vistCount: visitCount.rowCount > 0 ? Number(visitCount.rows[0].count) : 0,
      shortenedUrls: urls.rows,
    };
    return res.status(200).send(returnObj);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
