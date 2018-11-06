export const PI = 3.141592;

let _sqrt = function(s, x, last){
    return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};
export let sqrt = function(s){
    return _sqrt(s, s/2.0, 0.0);
};
export let square = function(x) {
    return x * x;
};