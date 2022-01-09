var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Food = require('./food');
const path = require('path');
const fs = require('fs');

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

router.post('/add-foods', async (req, res) => {
  const food = new Food({ item: req.body });
  await food.save();
  res.send('Food added successfully');
  console.log(food);
});

router.post('/add-favourites', async (req, res) => {
  const food = new Food({ item: req.body });
  await food.save();
  res.send('Favourites added successfully');
  console.log(food);
});

router.get('/get-food', async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (e) {
    // res.send(e);
    console.log(e);
  }
});

module.exports = router;
