const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    return next();
  } catch (err) {
    const error = {
      status: 422,
      message: "Validation failed",
      extraDetails: err.issues.map((issue) => issue.message),
    };
    next(error);
  }
};

module.exports = validate;
