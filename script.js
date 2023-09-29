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
//
let negativeCounter = 0;

const computeNumbers = function (lastNum, curNum, type) {
  // GUARD ClAUSE for when there is no number after .
  // GUARD CLAUSE FOR WHEN INPUT IS ./ .* .- .+
  const check = function (firstString, secondString) {
    if (firstString === `.` || secondString === `.`) return true;
  };
  if (check(lastNum, curNum)) return;
  //
  lastNum = Number(lastNum);
  curNum = Number(curNum);

  // GUARD CLAUSE for when user clicks without a value
  if (lastNum === 0 && curNum === 0) return;
  // storing lastNum curNum type
  numStore.push(lastNum, type, curNum);
  console.log(numStore);

  // if our last Value is not empty then add them together
  // first time that function runs , last value is 0 so we need to start from second time
  if (numStore.length >= 6) {
    let lastComputedType = numStore[numStore.length - 5];
    let lastComputedValue = numStore[numStore.length - 3];
    let currentComputeValue = numStore[numStore.length - 1];

    if (type === `=`) {
      if (lastComputedType === `+`)
        lastNum = Number(lastComputedValue) + Number(currentComputeValue);

      if (lastComputedType === `-`)
        lastNum = Number(lastComputedValue) - Number(currentComputeValue);

      if (lastComputedType === `*`)
        lastNum = Number(lastComputedValue) * Number(currentComputeValue);

      if (lastComputedType === `/`)
        lastNum = Number(lastComputedValue) / Number(currentComputeValue);

      curValue = lastNum;
      lastValue = ``;
      numStore.splice(0, numStore.length);
      return;
    }

    if (lastComputedType === `+`)
      lastNum = Number(lastComputedValue) + Number(currentComputeValue);

    if (lastComputedType === `-`)
      lastNum = Number(lastComputedValue) - Number(currentComputeValue);

    if (lastComputedType === `*`)
      lastNum = Number(lastComputedValue) * Number(currentComputeValue);

    if (lastComputedType === `/`)
      lastNum = Number(lastComputedValue) / Number(currentComputeValue);

    curValue = ``;
    lastValue = lastNum;
    return;
  }
  // the first function runs
  // + - we add or decrease current number to 0
  // / * we use 1 for the first time because the first time that function runs our last Value is 0
  if (type === `*`) lastNum = Number(curNum);
  if (type === `/`) lastNum = Number(curNum);
  if (type === `+`) lastNum = Number(curNum);
  if (type === `-`) lastNum = Number(curNum);

  // make curValue empty and store the value inside lastValue
  curValue = ``;
  lastValue = lastNum;
};

const calcInit = function (e) {
  e.preventDefault();
  const targetInnerText = e.target.innerText;

  const targetAttribute = e.target.getAttribute(`data-value`);

  // Guard clause if its not a button return
  if (e.target.tagName !== `BUTTON`) return;

  // insert the numbers inside DOM as a string
  if (targetAttribute === `number` || targetAttribute === `-`) {
    curValue += targetInnerText;
    targetInnerText.includes(`-`) ? (negativeCounter += 1) : ``;
  }

  // RESET
  if (targetAttribute === `reset`) {
    curValue = ``;
    lastValue = ``;
    numStore.splice(0, numStore.length);
    negativeCounter = 0;
  }

  // DELETE - delete last number
  if (targetAttribute === `del`) {
    curValue = `${curValue}`;
    curValue = curValue.slice(0, curValue.length - 1);
  }

  // + * - / =

  // when its a negative number at start like -12 - 10 = -2
  const negativeCheckerOutput = function (numOutput) {
    if (typeof numOutput === `number`) return;

    const negativeCount = numOutput.split(``).reduce((acc, val) => {
      val === `-` ? (acc += 1) : acc;
      return acc;
    }, 0);

    if (negativeCount === 2) {
      numOutput = numOutput.replaceAll(`-`, ``);
      numOutput = Number(-numOutput);
      computeNumbers(lastValue, numOutput, `-`);
    }
  };
  negativeCheckerOutput(curValue);

  if (targetAttribute === `-` && curValue[0] === `-` && negativeCounter === 2) {
    curValue = curValue.replaceAll(`-`, ``);
    curValue = Number(-curValue);
    negativeCounter = 0;
    computeNumbers(lastValue, curValue, `-`);
  }

  // when its a positive number minus  12 - 10 = 2
  if (targetAttribute === `-` && curValue[0] !== `-`) {
    curValue = curValue.replaceAll(`-`, ``);
    computeNumbers(lastValue, curValue, `-`);
  }
  if (targetAttribute === `*`) computeNumbers(lastValue, curValue, `*`);
  if (targetAttribute === `+`) computeNumbers(lastValue, curValue, `+`);
  if (targetAttribute === `/`) computeNumbers(lastValue, curValue, `/`);
  if (targetAttribute === `=`) computeNumbers(lastValue, curValue, `=`);

  // render the values inside DOM
  numOutput.innerText = curValue;
  lastComputedValue.innerText = lastValue;
};

btnContainer.addEventListener(`click`, calcInit);
