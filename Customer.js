class Customer {
  constructor() {
    this.cart = [];
    this.cartTotal = 0;
  }
  addItem() {}
  calculateBill() {}

  getCartItems(items) {
    const l = items.getItems();
    return l;
  }
  getTotal(items) {
    const total = items.getTotal();
    return total;
  }
}

module.exports = { Customer };
