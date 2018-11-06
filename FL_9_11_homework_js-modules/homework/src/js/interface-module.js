import { addition } from './calculating-module';
import { subtraction } from './calculating-module';
import { multiplication } from './calculating-module';
import { division } from './calculating-module';


export const calculate = (inputData) => {
    let calc = parseInputData(inputData);
    let result;

    switch (calc.operator) {
        case '+':
            result = addition(calc.firstOperand, calc.secondOperand);
            break;
        case '-':
            result = subtraction(calc.firstOperand, calc.secondOperand);
            break;
        case '*':
            result = multiplication(calc.firstOperand, calc.secondOperand);
            break;
        case '/':
            result = division(calc.firstOperand, calc.secondOperand);
            break;
        default:
            break;
    }

    if (isNaN(result) || !isFinite(result)) {

        return `Error! Wrong operation.`;

    } else {
        result = `${calc.firstOperand}${calc.operator}${calc.secondOperand}=${result}`;

        return result;
    }
};

const parseInputData = (data) => {
    let indexArr = [];
    let dataArr = [];

    let add = data.indexOf('+');
    if (~add) {
        indexArr.push(add);
    }
    let sub = data.indexOf('-');
    if (~sub) {
        indexArr.push(sub);
    }
    let mul = data.indexOf('*');
    if (~mul) {
        indexArr.push(mul);
    }
    let div = data.indexOf('/');
    if (~div) {
        indexArr.push(div);
    }

    indexArr = indexArr.sort((a, b) => a - b);

    let action = indexArr[0] > 0 ? data[indexArr[0]] : data[indexArr[1]];
    dataArr = data.split(action);

    return {
        firstOperand: parseFloat(dataArr[0]),
        secondOperand: parseFloat(dataArr[1]),
        operator: action
    }
}