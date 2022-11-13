const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
  check("name").notEmpty().withMessage("Please enter full name."),
  check("email").isEmail().withMessage("Please enter a valid email."),
  check("password").notEmpty().withMessage("Please enter the password."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Please enter a valid email."),
  check("password").notEmpty().withMessage("Please enter the password."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

exports.validateCreateUser = [
  check("name").notEmpty().withMessage("Please enter full name."),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
