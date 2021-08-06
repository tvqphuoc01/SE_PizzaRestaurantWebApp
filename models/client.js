/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class Client {
  constructor(id, userName, passWord, email, FirstName, LastName, Gender, avatar) {
    this.id = id;
    this.email = email;
    this.userName = userName;
    this.passWord = passWord;
    this.firstName = FirstName;
    this.lastName = LastName;
    this.address = address;
    this.phone = phone;
    this.gender = Gender;
    this.cart = [];
    this.avatar = avatar;
    this.checkOrder = "";
    this.historyOrder = [];
  }
}

module.exports = Client;
