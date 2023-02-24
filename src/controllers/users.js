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
      visitCount: visitCount.rowCount > 0 ? Number(visitCount.rows[0].count) : 0,
      shortenedUrls: urls.rows,
    };
    return res.status(200).send(returnObj);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function usersRanking(_, res) {
  try {
    const results = await db.query(
      `
      SELECT "user_account"."id", "user_account"."name", 
      CAST(COUNT ("url"."id") AS INTEGER) AS "linksCount",
      CAST(COALESCE(SUM("visitCount"), 0) AS INTEGER) as "visitCount"
      FROM "user_account" LEFT JOIN "url" on "user_account"."id" = "url"."user"
      GROUP BY "user_account"."id", "user_account"."name"
      ORDER BY "visitCount" DESC
      LIMIT 10
       `
    );
    return res.status(200).send(results.rows);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}
