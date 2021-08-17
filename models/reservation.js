class Reservation {
    constructor(id, userId, UserName, date, time, address, email, phone, messange) {
      this.id = id;
      this.userId = userId;
      this.UserName = UserName;
      this.date = date;
      this.time = time
      this.status = 0;
      this.address = address;
      this.email = email;
      this.phone = phone;
      this.messange = messange;
    }
  }
  
  module.exports = Reservation;