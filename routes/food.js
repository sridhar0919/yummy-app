const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  item: Array,
});

const orderSchema = new mongoose.Schema({
  item: Array,
});

const food = mongoose.model('Food', foodSchema);

module.exports.saveRequest = function (newFood, callback) {
  newFood.save(callback);
};

const order = mongoose.model('Order', orderSchema);

module.exports = {
  Food: food,
  Order: order,
};
