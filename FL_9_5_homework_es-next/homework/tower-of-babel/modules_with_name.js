import {PI, sqrt, square} from './modules_with_name_math';

let arg1 = process.argv[2];
let arg2 = process.argv[3];

console.log(PI);
console.log(sqrt(+arg1));
console.log(square(+arg2));