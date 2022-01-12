const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  item: Array,
});

const orderSchema = new mongoose.Schema({
  item: Array,
});

module.exports = mongoose.model('Food', foodSchema);
module.exports = mongoose.model('Order', orderSchema);
