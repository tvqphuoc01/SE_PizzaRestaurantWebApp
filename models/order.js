class Order {
    constructor(id, userId, date, time, cart, totals, shipFee, address) {
      this.id = id;
      this.userId = userId;
      this.date = date;
      this.time = time
      this.cart = cart;
      this.totals = totals;
      this.shipFee = shipFee;
      this.status = 0;
      this.address = address;
    }
  }
  
  module.exports = Order;
  