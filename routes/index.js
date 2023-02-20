var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { Food } = require('./food');
const { Order } = require('./food');
const path = require('path');
const fs = require('fs');
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

mongoose.connect(
  process.env.MONGOURL,
  () => {
    console.log('connected');
  },
  (e) => console.log(e)
);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Adding foods
router.post('/add-foods', async (req, res) => {
  const food = new Food({ item: req.body });
  await food.save();
  res.send('Food added successfully');
  console.log(food);
});

// Getting all foods
router.get('/get-food', async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (e) {
    res.send(e);
  }
});

// Posting food orders
router.post('/add-orders', async (req, res) => {
  const content = await Order.find();
  if (content.length === 0) {
    const order = new Order({ item: req.body });
    await order.save();
    res.send({
      message: 'New order placed successfully',
    });
  } else {
    await Order.deleteMany({});
    const order = new Order({ item: req.body });
    await order.save();
    res.send({
      message: 'Order placed successfully',
    });
  }
});

// Getting food orders
router.get('/get-orders', async (req, res) => {
  const order = await Order.find();
  console.log(order);
  res.send({
    message: 'Orders fetched successfully',
    details: order,
  });
});

// create payment order
router.post('/create/orderId', async (req, res) => {
  console.log('create orderId request', req.body);
  var options = {
    amount: req.body.amount,
    currency: 'INR',
    receipt: 'rcp1',
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send({ orderId: order.id });
  });
});

module.exports = router;
