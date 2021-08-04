class Order {
    constructor(id, userId, date, cart, totals, shipFee) {
      this.id = id;
      this.userId = userId;
      this.date = date;
      this.cart = cart;
      this.totals = totals;
      this.shipFee = shipFee;
    }
  }
  
  module.exports = Order;
  