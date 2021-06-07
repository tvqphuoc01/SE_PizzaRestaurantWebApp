/* eslint-disable require-jsdoc */
class Client {
  constructor(id, userName, passWord, email, cart, FirstName, LastName, Gender) {
    this.id = id;
    this.email = email;
    this.userName = userName;
    this.passWord = passWord;
    this.firstName = FirstName;
    this.lastName = LastName;
    this.gender = Gender;
    this.cart = [];
  }
}

module.exports = Client;
