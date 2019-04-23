const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job Title field is Required!";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is Required!";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From Date field is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
