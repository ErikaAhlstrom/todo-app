/* eslint-disable no-undef */

const { checkEmptyFieldsRegister, checkEmptyFieldsLogin, checkPasswordLength } = require('../utils/validationUser');

test('that there is no empy fields when registering a user', () => {
  const email = 'email@example.com';
  const password = 'abc123';
  const firstName = 'John';
  let lastName = 'Doe';
  const firstCheck = checkEmptyFieldsRegister(email, password, firstName, lastName);
  lastName = '';
  expect(firstCheck).toBeTruthy();
  const secondCheck = checkEmptyFieldsRegister(email, password, firstName, lastName);
  expect(secondCheck).toBeFalsy();
});

test('that there is no empy fields when logging in a user', () => {
  const email = 'email@example.com';
  let password = 'abc123';
  const firstCheck = checkEmptyFieldsLogin(email, password);
  expect(firstCheck).toBeTruthy();
  password = '';
  const secondCheck = checkEmptyFieldsLogin(email, password);
  expect(secondCheck).toBeFalsy();
});

test('that the legnt of the password is >= 6', () => {
  let password = 'abc123';
  const firstCheck = checkPasswordLength(password);
  expect(firstCheck).toBeTruthy();
  password = 'abc13';
  const secondCheck = checkPasswordLength(password);
  expect(secondCheck).toBeFalsy();
});
