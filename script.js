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

// STORE The current value
let curValue = ``;
// store the last value we had
let lastValue = ``;

const numStore = [];

const computeNumbers = function (lastNum, curNum, type) {
  lastNum = Number(lastNum);
  curNum = Number(curNum);

  console.log(type);
  console.log(lastNum);
  console.log(curNum);

  numStore.push(lastNum, curNum, type);
  // console.log(numStore.splice(1));

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

  if (type === `*`) lastNum = Number(lastNum) * Number(curNum);
  if (type === `-`) lastNum = Number(lastNum) - Number(curNum);
  if (type === `+`) lastNum = Number(lastNum) + Number(curNum);
  if (type === `/`) lastNum = Number(lastNum) / Number(curNum);
  console.log(lastNum);
  curValue = ``;
  lastValue = lastNum;
};
console.log(computeNumbers(0, 5, `/`));
const calcInit = function (e) {
  e.preventDefault();
  const targetInnerText = e.target.innerText;

  const targetAttribute = e.target.getAttribute(`data-value`);

  // Guard clause if its not a button return
  if (e.target.tagName !== `BUTTON`) return;

  // insert the numbers inside DOM
  if (targetAttribute === `number`) {
    curValue += targetInnerText;
  }

  // RESET
  if (targetAttribute === `reset`) {
    curValue = ``;
    lastValue = ``;
    numStore.splice(0, numStore.length);
  }

  // DELETE
  if (targetAttribute === `del`) {
    curValue = curValue.slice(0, curValue.length - 1);
  }

  // + * - / =
  if (targetAttribute === `*`) computeNumbers(lastValue, curValue, `*`);
  if (targetAttribute === `-`) computeNumbers(lastValue, curValue, `-`);
  if (targetAttribute === `+`) computeNumbers(lastValue, curValue, `+`);
  if (targetAttribute === `/`) computeNumbers(lastValue, curValue, `/`);
  // =
  if (targetAttribute === `=`) computeNumbers(lastValue, curValue, `=`);

  // render
  numOutput.innerText = curValue;
  lastComputedValue.innerText = lastValue;
};

btnContainer.addEventListener(`click`, calcInit);
