"use strict";

const themeCheckboxElement = document.getElementById(`theme-checkbox`);
const themeToggleDotElement = document.getElementById(`theme-toggle-dot`);
const btnContainer = document.getElementById(`calculator-btn-container`);
const numOutput = document.getElementById(`output-num`);
const lastComputedValue = document.getElementById(`last-value-store`);

const toggleTheme = function () {
  themeToggleDotElement.classList.toggle(`translate-x-5`);
  themeToggleDotElement.classList.toggle(`-translate-x-5`);
};
themeCheckboxElement.addEventListener(`click`, toggleTheme);

//////////////////////////////////////////////////////////////////////////////////////

// Storing current value
let curValue = ``;
// store the last value we had
let lastValue = ``;
// storing Last value,current value, type of the math operation
const numStore = [];

const computeNumbers = function (lastNum, curNum, type) {
  lastNum = Number(lastNum);
  curNum = Number(curNum);
  // GUARD CLAUSE for when user clicks without a value
  if (lastNum === 0 && curNum === 0) return;
  // storing lastNum curNum type
  numStore.push(lastNum, curNum, type);
  console.log(numStore);
  // if our last Value is not empty then add them together
  // first time that function runs , last value is 0 so we need to start from second time
  if (numStore.length >= 6) {
    if (type === `=`) {
      if (numStore[numStore.length - 4] === `+`)
        lastNum =
          Number(numStore[numStore.length - 3]) +
          Number(numStore[numStore.length - 2]);

      if (numStore[numStore.length - 4] === `-`)
        lastNum =
          Number(numStore[numStore.length - 3]) -
          Number(numStore[numStore.length - 2]);

      if (numStore[numStore.length - 4] === `*`)
        lastNum =
          Number(numStore[numStore.length - 3]) *
          Number(numStore[numStore.length - 2]);

      if (numStore[numStore.length - 4] === `/`)
        lastNum =
          Number(numStore[numStore.length - 3]) /
          Number(numStore[numStore.length - 2]);

      curValue = lastNum;
      lastValue = ``;
      numStore.splice(0, numStore.length);
      return;
    }

    if (numStore[numStore.length - 4] === `+`)
      lastNum =
        Number(numStore[numStore.length - 3]) +
        Number(numStore[numStore.length - 2]);

    if (numStore[numStore.length - 4] === `-`)
      lastNum =
        Number(numStore[numStore.length - 3]) -
        Number(numStore[numStore.length - 2]);

    if (numStore[numStore.length - 4] === `*`)
      lastNum =
        Number(numStore[numStore.length - 3]) *
        Number(numStore[numStore.length - 2]);

    if (numStore[numStore.length - 4] === `/`)
      lastNum =
        Number(numStore[numStore.length - 3]) /
        Number(numStore[numStore.length - 2]);

    curValue = ``;
    lastValue = lastNum;
    return;
  }
  // the first function runs
  // + - we add or decrease current number to 0
  // / * we use 1 for the first time because the first time that function runs our last Value is 0
  if (type === `*`) lastNum = Number(curNum) * 1;
  if (type === `/`) lastNum = Number(curNum) / 1;
  if (type === `+`) lastNum = Number(lastNum) + Number(curNum);
  if (type === `-`) lastNum = Number(curNum) - Number(lastNum);

  // make curValue empty and store the value inside lastValue
  curValue = ``;
  lastValue = lastNum;
};

// console.log(computeNumbers(0, 5, `/`));

const calcInit = function (e) {
  e.preventDefault();
  const targetInnerText = e.target.innerText;

  const targetAttribute = e.target.getAttribute(`data-value`);

  // Guard clause if its not a button return
  if (e.target.tagName !== `BUTTON`) return;

  // insert the numbers inside DOM as a string
  if (targetAttribute === `number`) {
    curValue += targetInnerText;
  }

  // RESET
  if (targetAttribute === `reset`) {
    curValue = ``;
    lastValue = ``;
    numStore.splice(0, numStore.length);
  }

  // DELETE - delete last number
  if (targetAttribute === `del`) {
    curValue = curValue.slice(0, curValue.length - 1);
  }

  // + * - / =
  if (targetAttribute === `*`) computeNumbers(lastValue, curValue, `*`);
  if (targetAttribute === `-`) computeNumbers(lastValue, curValue, `-`);
  if (targetAttribute === `+`) computeNumbers(lastValue, curValue, `+`);
  if (targetAttribute === `/`) computeNumbers(lastValue, curValue, `/`);
  if (targetAttribute === `=`) computeNumbers(lastValue, curValue, `=`);

  // render the values inside DOM
  numOutput.innerText = curValue;
  lastComputedValue.innerText = lastValue;
};

btnContainer.addEventListener(`click`, calcInit);
