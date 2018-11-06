const express = require('express');
const bodyParser = require('body-parser');
const cars = require('./handlers/car');

const router = express.Router();
const jsonParser = bodyParser.json();

router.route('/car')
    .get(cars.getCarList)
    .post(jsonParser, cars.createNewCar);

router.route('/car/:id')
    .get(cars.getCarById)
    .put(jsonParser, cars.updateCarById)
    .delete(cars.removeCarById)

module.exports = router;