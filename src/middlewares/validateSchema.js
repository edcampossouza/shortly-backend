export default function validateSchema(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      convert: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(422).send(message);
    }
    res.locals.value = value;
    next();
  };
}
