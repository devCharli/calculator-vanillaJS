const screen = document.querySelector(".screen");
const trackScreen = document.querySelector(".history-screen");
const btn = document.querySelector(".buttons");

let total = 0;
let screenText = "0";
let historyArr = [];
let prevOperator = null;

// handling number
function handleNumber(num) {
  if (screenText === "0") {
    if (num !== "0") {
      screenText = num;
      historyArr.push(num);
    }
  } else {
    screenText += num;
    historyArr.push(num);
  }
}

// handling math operators
function handleSymbol(symbol) {
  if (screenText === "0") {
    return;
  }
  // resetting variables values
  switch (symbol) {
    case "AC":
      total = 0;
      screenText = "0";
      historyArr = [];
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      handleMath(parseInt(screenText));
      // save new total value to screen text and resetting other values
      screenText = total;
      prevOperator = null;
      total = 0;
      historyArr = [];
      historyArr.push(screenText);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleBuffer(symbol);
      historyArr.push(symbol);
      break;
  }
}

function handleBuffer(symbol) {
  if (screenText === "0") {
    return;
  }

  const intScreenText = parseInt(screenText);

  if (total === 0) {
    total = intScreenText;
  } else {
    handleMath(intScreenText);
  }

  // handleBuffer func is basically for assigning prevOperator and screenText
  prevOperator = symbol;
  screenText = "0";
}

// getting total result

function handleMath(intScreenText) {
  if (prevOperator === "+") {
    total += intScreenText;
  } else if (prevOperator === "-") {
    total -= intScreenText;
  } else if (prevOperator === "*") {
    total *= intScreenText;
  } else {
    total /= intScreenText;
  }
}

btn.addEventListener("click", (e) => {
  if (isNaN(e.target.value)) {
    handleSymbol(e.target.value);
  } else {
    handleNumber(e.target.value);
  }
  screen.innerText = screenText;
  trackScreen.innerText = historyArr.join(" ");
});
