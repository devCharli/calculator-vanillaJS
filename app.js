const screen = document.querySelector(".screen");
const trackScreen = document.querySelector(".history-screen");
const btn = document.querySelector(".buttons");
let total = 0;
let screenText = "0";
let history = [];
let prevOperator;

// handling number input
function handleNumber(num) {
  if (screenText === "0") {
    screenText = num;
    history.push(num);
  } else {
    screenText += num;
    history.push(num);
  }
}

// handling math symbols
function handleSymbol(symbol) {
  if (screenText === "0") {
    return;
  }
  switch (symbol) {
    case "AC":
      total = 0;
      screenText = "0";
      history = [];
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      getResult(parseInt(screenText));
      // save new total value to screen text and resetting other values
      screenText = total;
      prevOperator = null;
      total = 0;
      history = [];
      history.push(screenText);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(symbol);
      history.push(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (screenText === "0") {
    return;
  }
  const intscreenText = parseInt(screenText);
  if (total === 0) {
    total = intscreenText;
  } else {
    getResult(intscreenText);
  }
  prevOperator = symbol;
  screenText = "0";
}

function getResult(intscreenText) {
  if (prevOperator === "+") {
    total += intscreenText;
  } else if (prevOperator === "-") {
    total -= intscreenText;
  } else if (prevOperator === "*") {
    total *= intscreenText;
  } else {
    total /= intscreenText;
  }
}

btn.addEventListener("click", (e) => {
  if (isNaN(e.target.value)) {
    handleSymbol(e.target.value);
  } else {
    handleNumber(e.target.value);
  }
  screen.innerText = screenText;
  trackScreen.innerText = history.join(" ");
});
