const fs = require('fs');
let db = JSON.parse(fs.readFileSync('./db/data.json'));

let createNewCar = (req, res) => {
    if (db.find(car => car.id === Number(req.body.id))) {
        res.status(409).send({'message': 'Car already exists.'});
    }
    db.push(req.body);
    db.sort((currentCar, nextCar) => currentCar.id - nextCar.id);
    fs.writeFileSync('./db/data.json', JSON.stringify(db));
    res.status(201).send(req.body);
};

let getCarList = (req, res) => {
    res.status(200).send(db);
};

let getCarById = (req, res) => {
    const car = db.find(car => car.id === Number(req.params.id));
    if (car) {
        res.status(200).send(JSON.stringify(car));
    }
    res.status(404).send({'message': 'Car with such id has not been found'});
};

let updateCarById = (req, res) => {
    const car = db.findIndex(car => car.id === Number(req.params.id));

    if (db[car]) {
        db.splice(car, 1, req.body);
        fs.writeFileSync('./db/data.json', JSON.stringify(db));
        res.status(200).send(JSON.stringify(req.body));
    }

    res.status(404).send({'message': 'Car with such id has not been found'});
};

let removeCarById = (req, res) => {
    const car = db.findIndex(car => car.id === Number(req.params.id));

    if (db[car]) {
        db.splice(car, 1);
        fs.writeFileSync('./db/data.json', JSON.stringify(db));
        res.status(200).send({'message': 'The car has been successfully removed'});
    }

    res.status(404).send({'message':'Car with such id has not been found'});
};


module.exports = {
    createNewCar: createNewCar,
    getCarList: getCarList,
    getCarById: getCarById,
    updateCarById: updateCarById,
    removeCarById: removeCarById
};