const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Text Must be Between 10 to 300 characters!";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
