const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
  let errors = {};
  // checking that username and password entered are valid text format 
  data.username = validText(data.username) ? data.username : '';
  // to verify password was entered correcty the first time
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, { min: 2, max: 10 })) {
    errors.username = 'Username must be between 2 and 10 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords did not match';
  }

  return {
    errors,
    //check if any errors were caught by checking if errors obj is empty
    isValid: Object.keys(errors).length === 0
  };
};