const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};
  // checking that username and password entered are valid text format 
  data.username = validText(data.username) ? data.username : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    //check if any errors were caught by checking if errors obj is empty
    isValid: Object.keys(errors).length === 0
  };
};