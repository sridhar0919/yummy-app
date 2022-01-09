const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  item: Array,
});

module.exports = mongoose.model('Food', foodSchema);
