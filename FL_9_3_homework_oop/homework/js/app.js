function Product(name, description, price) {
    const _logs = [];
    let _shoppingCart;
    
    if(typeof name === 'string' && name.trim().length > 0) {
        this.name = name;
    } else {
        console.error('Invalid name argument');
    }

    if (typeof description === 'object') {
        this.description = description;
    } else {
        console.error('Invalid description argument');
    }

    if(typeof price === 'number' && price >= 0
    && !Number.isNaN(price) && Number.isFinite(price)) {
        this.price = +price.toFixed(2);
    } else {
        console.error('Invalid price argument');
    }


    this.getPrice = function() {
        return this.price;
    }

    this.setPrice = function(newPrice) {
        if(typeof price === 'number' && price >= 0
        && !Number.isNaN(price) && Number.isFinite(price) && newPrice > this.price) {
            this.price = +newPrice.toFixed(2);
        } else {
            console.error(`Can't set a ${this.price} to ${newPrice}`);
        }
        return this;
    }

    this.add = function(shoppingCart) {
        if (shoppingCart instanceof ShoppingCart) {
            _shoppingCart = shoppingCart;
            _logs.push(`${this.name} is added to ${_shoppingCart.name} on ${getDate()}`);
        } else {
            console.error('argument is not an instance of ShoppingCart');
        }
      
        return this;
    }

    this.removeProduct = function(shoppingCart) {
        if (shoppingCart instanceof ShoppingCart) {
            _logs.push(`${this.name} is removed from ${_shoppingCart.name} on ${getDate()}`);
            _shoppingCart = null;
        } else {
            console.error('argument is not an instance of ShoppingCart');
        }
      
        return this;
    }

    this.getHistory = function() {
        return _logs;
    }
}

function ShoppingCart(name, owner, maxCount) {
    if(typeof name === 'string' && name.trim().length > 0) {
        this.name = name;
    } else {
        console.error('Invalid name argument');
    }

    if(typeof owner === 'string' && owner.trim().length > 0) {
        this.owner = owner;
    } else {
        console.error('Invalid owner argument');
    }

    if (Number.isInteger(maxCount)) {
        this.maxCount = maxCount;
    } else {
        console.error(`A number should be without decimals`);
    }

    const _products = [];
    const _logs = [];
    let Id = 1;
    

    this.addNewProduct = function(product) {
        if (product instanceof Product) {
            if (_products.length >= this.maxCount) {
                this.removeLowestPriceProduct();
            }
            product['id'] = Id++;
            product['dateOdAddingToCart'] = getDate();
            product.add(this);
            _products.push(product);
            _logs.push(`${product.name} was added to ${this.name} on ${getDate()}`);
        } else {
            console.error('Argument should be an instance of Product');
        }

        return this;
    }

    this.removeProduct = function(product) {
        if (product instanceof Product) {
            if (product.id !== undefined) {
                let index = _products.findIndex(el => el.id === product.id);
                if (index !== -1) {
                    _products.splice(index, 1);
                    product.removeProduct(this);
                    _logs.push(`${product.name} was removed from ${this.name} on ${getDate()}`);
                } else {
                    console.error(`${product._name} doesn't exist in current cart!`);
                }
            }

        } else {
            console.error('Argument should be an instance of Product');
        }
        return this;
    }

    this.getAvaragePrice = function() {
        return +(this.getTotalPrice() / this._products.length).toFixed(2);
    }

    this.getProducts = function() {
        return _products;
    }

    this.getFormattedListOfProducts = function() {
        return _products.map(product => `${product.name} - is on ${this.name} from ${product.dateOdAddingToCart}.\
 Detailed product description: ${JSON.stringify(product.description)}`);
    }

    this.getTotalPrice = function() {
        return _products.reduce((accum, product) => accum + product.getPrice(), 0);
    }

    this.getHistory = function() {
        return _logs;
    }

    this.removeLowestPriceProduct = function () {
        let smallestInd = 0;
        let smallestPrice = _products[0].price;

        for (let i = 1; i < _products.length; i++) {
            if (_products[i].price < smallestPrice) {
                smallestInd = i;
                smallestPrice = _products[i].price;
            }
        }

        this.removeProduct(_products[smallestInd]);

    }
}



function getDate() {
    return new Date().toLocaleString();
}

// **Testing Block**
const banana1 = new Product('banana1', { color: 'yellow', size: 'medium' }, 45);
const apple1 = new Product('apple1', { color: 'red', size: 'small' }, 30);
const avocado1 = new Product('avocado1', { color: 'green', size: 'medium' }, 60);
const avocado2 = new Product('avocado2', { color: 'green', size: 'small' }, 50);
const banana2 = new Product('banana2', { color: 'yellow', size: 'small' }, 40);
const apple2 = new Product('apple2', { color: 'green', size: 'medium' }, 40);
const stevesShopCart = new ShoppingCart('stevesCart', 'Steve', 5);

stevesShopCart
    .addNewProduct(avocado1)
    .addNewProduct(banana1)
    .addNewProduct(banana2)
    .addNewProduct(apple1)
    .addNewProduct(apple2)
    .addNewProduct(avocado2)
    .removeProduct(banana1)
    .removeProduct(apple2)
    .removeProduct(apple1);


console.log('Cart History log >>>>');
console.log(stevesShopCart.getHistory());
console.log('Product History log >>>>');
console.log(apple1.getHistory());

console.log('avarage price:', stevesShopCart.getAvaragePrice());
console.log('total price:', stevesShopCart.getTotalPrice());

stevesShopCart
    .addNewProduct('apple string');

avocado1
    .setPrice(20)
    .setPrice(100);

console.log(avocado1.getHistory());

console.table(stevesShopCart.getFormattedListOfProducts());

const georgesShopCart = new ShoppingCart('GeorgeCart', 'George', 1);
georgesShopCart.addNewProduct(avocado1);
console.table(stevesShopCart.getFormattedListOfProducts());
console.table(georgesShopCart.getFormattedListOfProducts());
console.log(georgesShopCart.getHistory());