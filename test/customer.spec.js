const { Customer } = require("../Customer");
const { assert } = require("chai");
const sinon = require("sinon");

describe("customer class", function () {
  let cust, items;
  before("new customer", function () {
    cust = new Customer();
    sinon.stub(cust, "addItem").callsFake((item) => {
      cust.cart.push(item);
    });
    sinon.stub(cust, "calculateBill").callsFake(() => {
      cust.cartTotal = cust.cart.reduce((x, { price, quantity }) => {
        return x + quantity * price;
      }, 0);
    });

    cust.addItem({ name: "Radish", quantity: 1, price: 10 });
    cust.addItem({ name: "Potato", quantity: 3, price: 40 });
    cust.addItem({ name: "Brinjal", quantity: 2, price: 20 });
    cust.addItem({ name: "Spinach", quantity: 3, price: 15 });
    cust.addItem({ name: "Pumpkin", quantity: 4, price: 10 });

    items = {
      getItems: function () {},
      getTotal: function () {},
    };
    sinon.stub(items, "getItems").returns(cust.cart);
  });

  it("adds new items to cart", function () {
    const list = cust.getCartItems(items);
    assert.lengthOf(list, 5);
  });

  it("calculates total bill amount", function () {
    cust.calculateBill();
    sinon.stub(items, "getTotal").returns(cust.cartTotal);
    const total = cust.getTotal(items);
    assert.strictEqual(total, 255);
  });
});
