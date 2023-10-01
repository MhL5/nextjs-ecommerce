"use strict";

import "./theme.js";

const btnContainer = document.getElementById(`calculator-btn-container`);
const numOutput = document.getElementById(`output-num`);
const lastComputedValue = document.getElementById(`last-value-store`);

//////////////////////////////////////////////////////////////////////////////////////

// Storing current value
let curValue = ``;
// store the last computed value we had
let lastValue = ``;
// storing Last value,current value, type of the math operation
const calcHistory = [];
// counter for when user input more than one -
let negativeCounter = 0;

// compute numbers
const computeNumbers = function (lastNum, curNum, type) {
  // GUARD CLAUSE FOR WHEN INPUT IS . -
  // it happens when user clicks on other operations after . and - without value
  const check = function (firstString, secondString) {
    if (
      firstString === `.` ||
      firstString === `-` ||
      secondString === `.` ||
      secondString === `-`
    )
      return true;
  };
  if (check(lastNum, curNum)) return;

  // turn lastNum and curNum into a number
  lastNum = Number(lastNum);
  curNum = Number(curNum);

  console.log(curNum === -0);
  // GUARD CLAUSE for when user clicks without a value - we need to check for this after converting lastNum and curNum to a number
  if ((lastNum === 0 && curNum === 0) || curNum === -0) {
    deleteLastWord();
    return;
  }

  // storing history
  calcHistory.push(lastNum, type, curNum);
  console.log(calcHistory);

  // if our last Value is not empty then add them together
  // first time that function runs , last value is 0 so we need to start from second time
  if (calcHistory.length >= 6) {
    let lastComputedType = calcHistory[calcHistory.length - 5];
    let lastComputedValue = calcHistory[calcHistory.length - 3];
    let currentComputeValue = calcHistory[calcHistory.length - 1];

    if (type === `=`) {
      if (lastComputedType === `+`)
        lastNum = Number(lastComputedValue) + Number(currentComputeValue);

      if (lastComputedType === `-`)
        lastNum = Number(lastComputedValue) - Number(currentComputeValue);

      if (lastComputedType === `*`)
        lastNum = Number(lastComputedValue) * Number(currentComputeValue);

      if (lastComputedType === `/`)
        lastNum = Number(lastComputedValue) / Number(currentComputeValue);

      negativeCounter = 0;
      curValue = lastNum;
      lastValue = ``;
      calcHistory.splice(0, calcHistory.length);
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

    negativeCounter = 0;
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
  negativeCounter = 0;
  curValue = ``;
  lastValue = lastNum;
};

// processNumberValues - Display the values inside DOM and store them
const processNumberValues = function (input) {
  curValue += input;
  input.includes(`-`) ? (negativeCounter += 1) : ``;
};

//  RESET BUTTON
const reset = function () {
  curValue = ``;
  lastValue = ``;
  calcHistory.splice(0, calcHistory.length);
  negativeCounter = 0;
};

// Delete button
const deleteLastWord = function () {
  curValue = `${curValue}`;
  curValue = curValue.slice(0, curValue.length - 1);
};

//  NEGATIVE NUMBERS
const negativeCheckerInput = function (numOutput, targetAttribute) {
  // Guard clause
  if (typeof numOutput === `number`) return;
  if (numOutput === `--`) numOutput.slice(0, numOutput.length - 1);
  // check if we have two -
  const negativeCount = numOutput.split(``).reduce((acc, val) => {
    val === `-` ? (acc += 1) : acc;
    return acc;
  }, 0);
  // remove the second -
  if (negativeCount === 2 && numOutput !== `--`) {
    numOutput = numOutput.replaceAll(`-`, ``);
    numOutput = Number(-numOutput);
    computeNumbers(lastValue, numOutput, `-`);
    return;
  }

  // call the function after getting second - input
  if (targetAttribute === `-` && curValue[0] === `-` && negativeCounter === 2) {
    curValue = curValue.replaceAll(`-`, ``);
    curValue = Number(-curValue);
    negativeCounter = 0;
    computeNumbers(lastValue, curValue, `-`);
    return;
  }

  // when its a positive number minus  12 - 10 = 2
  if (targetAttribute === `-` && curValue[0] !== `-` && curValue !== -0) {
    curValue = curValue.replaceAll(`-`, ``);
    computeNumbers(lastValue, curValue, `-`);
    return;
  }
};

//
const calcInit = function (e) {
  e.preventDefault();
  const targetInnerText = e.target.innerText;

  const targetAttribute = e.target.getAttribute(`data-value`);

  // Guard clause if its not a button element return
  if (e.target.tagName !== `BUTTON`) return;

  // insert the numbers inside DOM as a string
  if (targetAttribute === `number` || targetAttribute === `-`)
    processNumberValues(targetInnerText);

  // RESET
  if (targetAttribute === `reset`) reset();

  // DELETE - delete last number
  if (targetAttribute === `del`) deleteLastWord();

  // + * - / =
  // when its a negative number at start like -12 - 10 = -2
  negativeCheckerInput(curValue, targetAttribute); //              `-`
  if (targetAttribute === `*`) computeNumbers(lastValue, curValue, `*`);
  if (targetAttribute === `+`) computeNumbers(lastValue, curValue, `+`);
  if (targetAttribute === `/`) computeNumbers(lastValue, curValue, `/`);
  if (targetAttribute === `=`) computeNumbers(lastValue, curValue, `=`);

  // render the values inside DOM
  numOutput.innerText = curValue;
  lastComputedValue.innerText = lastValue;
};

btnContainer.addEventListener(`click`, calcInit);
