// icon input
const themeButtonElement = document.getElementById(`theme-button`);
// icon label
// right is dark - left is light
const themeToggleDotElement = document.getElementById(`theme-toggle-dot`);
// Theme variables
const userTheme = localStorage.getItem(`theme`);
const systemTheme = window.matchMedia(`(prefers-color-scheme: dark)`).matches;

const iconToggle = function () {
  // dark right
  themeToggleDotElement.classList.toggle(`translate-x-5`);
  // light left
  themeToggleDotElement.classList.toggle(`-translate-x-5`);
};

// initial theme check
const themeCheck = function () {
  if (userTheme === `dark` || (!userTheme && systemTheme)) {
    document.documentElement.classList.add(`dark`);
    // right is dark
    themeToggleDotElement.classList.add(`translate-x-5`);
    return;
  }
  // else its light left
  themeToggleDotElement.classList.add(`-translate-x-5`);
};

// Manual theme check
const themeSwitch = function () {
  if (document.documentElement.classList.contains(`dark`)) {
    document.documentElement.classList.remove(`dark`);
    localStorage.setItem(`theme`, `light`);
    iconToggle();
    return;
  }

  document.documentElement.classList.add(`dark`);
  localStorage.setItem(`theme`, `dark`);
  iconToggle();
};

themeButtonElement.addEventListener(`click`, themeSwitch);

// invoke themeCheck();
themeCheck();
