const checkEmptyFieldsRegister = (email, password, firstName, lastName) => {
  if (!email || !password || !firstName || !lastName) return false;
  return true;
};

const checkEmptyFieldsLogin = (email, password) => {
  if (!email || !password) return false;
  return true;
};
const checkPasswordLength = (password) => {
  if (password.length < 6) return false;
  return true;
};

module.exports = { checkEmptyFieldsRegister, checkEmptyFieldsLogin, checkPasswordLength };
