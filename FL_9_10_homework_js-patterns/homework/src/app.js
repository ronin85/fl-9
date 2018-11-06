class Store {
    constructor(pizzaSlicePrice, weekendDiscount, nightDiscount, bonus) {
        this.pizzaSlicePrice = pizzaSlicePrice || 100;
        this.weekendDiscount = weekendDiscount || 0;
        this.nightDiscount = nightDiscount || 0;
        this.bonus = bonus || 0;
    }
    totalPrice() {
        return this.pizzaSlicePrice - this.weekendDiscount - this.nightDiscount;
    } 

    buyPizzaSlice() {
        return `Price after discount is ${this.totalPrice()} and you have ${this.bonus} bonuses`;
    }
}

const getDiscount = (target) => {
    let date = new Date();

    if (date.getDay() === 0 || date.getDay() === 6) {
        target.weekendDiscount = 10;
    } else {
        target.weekendDiscount = 0;
    }

    if (date.getHours() === 23 || date.getHours() <= 6) {
        target.nightDiscount = 10;
    } else {
        target.nightDiscount = 0;
    }
};

const setBonus = (target) => {
    target.bonus += Math.floor(target.totalPrice() / 10);
};

let pizzaHut = new Store();
let chilentano = new Store();

getDiscount(pizzaHut);
setBonus(pizzaHut);
console.log(pizzaHut.buyPizzaSlice());

console.log(chilentano.buyPizzaSlice());