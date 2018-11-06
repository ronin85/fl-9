import '../styles/styles.css';
import { calculate } from './interface-module';

const root = document.querySelector('.root');

const template = `
<div class="display">
    <input type="text" class="input">
</div>
<button class="button clean">CE</button>
<div class="buttons-container">
    <button class="button">7</button>
    <button class="button">8</button>
    <button class="button">9</button>
    <button class="button div">/</button>
    <button class="button">4</button>
    <button class="button">5</button>
    <button class="button">6</button>
    <button class="button mul">*</button>
    <button class="button">1</button>
    <button class="button">2</button>
    <button class="button">3</button>
    <button class="button add">+</button>
    <button class="button">0</button>
    <button class="button">.</button>
    <button class="button result">=</button>
    <button class="button sub">-</button>
</div>`;

root.insertAdjacentHTML('afterBegin', template);

const resultBtn = document.querySelector('.result');
const inputField = document.querySelector('.input');
const cleanBtn = document.querySelector('.clean');
const butContainer = document.querySelector('.buttons-container');

resultBtn.addEventListener('click', () => {
    inputField.value = calculate(inputField.value);
    butContainer.removeEventListener('click', BtnHandler, false);
}, false);

cleanBtn.onclick = () => {
    inputField.value = '';
    butContainer.addEventListener('click', BtnHandler, false);
}

inputField.addEventListener('keypress', (e) => {
    e.preventDefault();
}, false);

inputField.onmousedown = () => {
    return false;
};

butContainer.addEventListener('click', BtnHandler, false);

function BtnHandler(e) {
    const act = e.target.textContent;
    const target = e.target;

    if (act === '+' || act === '-' || act === '*' || act === '/') {
        inputField.value += act;
    } else if (target.classList.contains('button')) {
        inputField.value += target.textContent;
    } else {
        return false;
    }

}