function assign(obj, defaults, options) {
    if(Object.keys(options).length === 0 && options.constructor === Object) {
        obj = defaults;
        return obj;
    } else {
        for(let key in options) {
            if(defaults.hasOwnProperty(key)) {
                defaults[key] = options[key];
            }
        }
        obj = defaults;
        return obj;
    }
}

function Bot({name, speed, x, y}) {
    this.name = name;
    this.speed = speed;
    this.defaultSpeed = this.speed;
    this.x = x;
    this.y = y;
}
Bot.prototype.getSpeed = function() {
    return this.speed;
}
Bot.prototype.setSpeed = function(value) {
    this.speed = value;
}
Bot.prototype.getDefaultSpeed = function() {
    return this.defaultSpeed;
}
Bot.prototype.getCoordinates = function() {
    return {x: this.x, y: this.y};
}
Bot.prototype.setCoordinates = function(x, y) {
    this.x = x;
    this.y = y;
}
Bot.prototype.move = function(direction) {
    switch(direction) {
        case 'up': 
            this.y += 1 * this.speed; 
            break;
        case 'down':
            this.y -= 1 * this.speed;
            break;
        case 'left':
            this.x -= 1 * this.speed;
            break;
        case 'right': 
            this.x += 1 * this.speed;
            break;
        default: 
            console.error('Invalid coordinates, valid coordinates are: up, down, left, right');
    }
}
Bot.prototype.showPosition = function() {
    console.log(`I am Bot '${this.name}'. I am located at ${this.x} : ${this.y}.`);
}


function Racebot() {
    Bot.apply(this, arguments); 
    this.previousDirection = null;
}
Racebot.prototype = Object.create(Bot.prototype);

Racebot.prototype.move = function(direction) {
    direction === this.previousDirection ? this.speed++ : this.speed = this.defaultSpeed;
    this.previousDirection = direction;
    Bot.prototype.move.call(this, direction);
}
Racebot.prototype.showPosition = function() {
    console.log(`I am Racebot '${this.name}'. I am located at ${this.x} : ${this.y}.`);
}

function Speedbot() {
    Bot.apply(this, arguments);
}

Speedbot.prototype = Object.create(Bot.prototype);

Speedbot.prototype.prepareEngine = function() {
    this.speed += 2;
}
Speedbot.prototype.move = function(direction) {
    Bot.prototype.move.call(this, direction);
    if(this.speed !== this.defaultSpeed) {
        this.speed--;
    }
}
Speedbot.prototype.showPosition = function() {
    console.log(`I am Speedbot '${this.name}'. I am located at ${this.x} : ${this.y}.`);
}

//** CODE TESTS **//
let defaults = { a: 123, b: 777 };
let options = { a: 456 };
let configs = assign({}, defaults, options);

let Botty = new Bot({name: 'Betty', speed: 2, x: 0, y: 1});
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
Botty.move('left');
Botty.move('down');
Botty.move('up');
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

let Zoom = new Racebot({name: 'Lightning', speed: 2, x: 0, y: 1});
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
Zoom.move('left');
Zoom.move('down');
Zoom.move('up');
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

let Broom = new Speedbot({name: 'Thunder', speed: 2, x: 0, y: 1});
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
Broom.prepareEngine();
Broom.move('left');
Broom.move('down');
Broom.move('up');
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8.