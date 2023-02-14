export function userData(_, res) {
  return res.status(200).send(res.locals?.user);
}
