const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School field is Required!";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is Required!";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Degree field is Required!";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From Date field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
