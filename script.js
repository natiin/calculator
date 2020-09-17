const container = document.querySelector(".container");
const mainDisplay = document.querySelector(".mainDisplay");
const display = document.querySelector(".display");

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["+", "-", "/", "x"];
let currentValue = [];
let storedMemory = [];

container.addEventListener("click", (event) => {
  let btn = event.target.innerText;

  if (event.target !== event.currentTarget) {
    {
      if (numbers.includes(btn)) {
        if (currentValue.length >= 15) {
          return;
        } else {
          calculate(btn);
        }
      } else if (btn === "←") {
        removeLastDigit();
      } else if (btn === ".") {
        getDecimal();
      } else if (btn === "C") {
        clearData();
        clearDisplay();
      } else if (btn === "+") {
        calculate("+");
      } else if (btn === "x") {
        calculate("x");
      } else if (btn === "/") {
        calculate("/");
      } else if (btn === "-") {
        calculate("-");
      } else if (btn === "=") {
        calculate("=");
      }
    }
  }
});

function removeLastDigit() {
  currentValue.pop();
  mainDisplay.innerText = currentValue.join("");
  display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
}

function clearData() {
  currentValue.splice(0, currentValue.length);
  storedMemory.splice(0, storedMemory.length);
}

function clearDisplay() {
  mainDisplay.innerText = "";
  display.innerText = "";
}

function getDecimal() {
  if (currentValue.includes(".")) {
    return;
  } else {
    currentValue.push(".");
    mainDisplay.innerText = currentValue.join("");
    display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
  }
}

function calculate(btn) {
  let lastItem = storedMemory[storedMemory.length - 1];
  if (currentValue.length === 0 && storedMemory.length > 0 && isNaN(lastItem)) {
    if (!isNaN(btn)) {
      currentValue.push(btn);
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (operators.includes(btn)) {
      storedMemory.splice([storedMemory.length - 1], 1, btn);
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (btn === "=") {
      storedMemory.splice([storedMemory.length - 1], 1);
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    }
  } else if (currentValue.length > 0 && storedMemory.length > 0 && isNaN(lastItem)) {
    if (!isNaN(btn)) {
      currentValue.push(btn);
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (operators.includes(btn)) {
      let string = currentValue.join("");
      storedMemory.push(string, btn);
      currentValue.splice(0, currentValue.length);
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (btn === "=") {
      let string = currentValue.join("");
      storedMemory.push(string);
      currentValue.splice(0, currentValue.length);
      getResult();
    }
  } else if (currentValue.length === 0 && storedMemory.length === 0) {
    if (!isNaN(btn)) {
      currentValue.push(btn);
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (btn === "-") {
      currentValue.push("-");
      mainDisplay.innerText = "-";
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else {
      return;
    }
  } else if (currentValue.length > 0 && storedMemory.length === 0) {
    if (!isNaN(btn)) {
      currentValue.push(btn);
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (operators.includes(btn)) {
      let string = currentValue.join("");
      storedMemory.push(string, btn);
      currentValue.splice(0, currentValue.length);
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (btn === "=") {
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    }
  } else if (currentValue.length === 0 && storedMemory.length > 0) {
    if (!isNaN(btn)) {
      clearData();
      currentValue.push(btn);
      mainDisplay.innerText = currentValue.join("");
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else if (operators.includes(btn)) {
      storedMemory.push(btn);
      currentValue.splice(0, currentValue.length);
      display.innerText = `${storedMemory.join("") + currentValue.join("")}`;
    } else {
      return;
    }
  }
}

//RESULT

let d = Number; // result of calculation put back into stored value

function getResult() {
  if (storedMemory.includes("/")) {
    changeArray("/");
    getResult();
  } else if (storedMemory.includes("x")) {
    changeArray("x");
    getResult();
  } else if (storedMemory.includes("-")) {
    changeArray("-");
    getResult();
  } else if (storedMemory.includes("+")) {
    changeArray("+");
    getResult();
  } else {
    mainDisplay.innerText = storedMemory.join("");
    display.innerText = display.innerText + "=";
  }
}

function changeArray(operator) {
  let indx = storedMemory.indexOf(operator) - 1; //find the indx of the operator
  let equation = storedMemory.splice(indx, 3); // cut equation

  singleCalculation(equation); // calculate the equation

  if (d > 99999999999999 || d === Infinity || d === -Infinity) {
    clearDisplay();
    clearData();
    mainDisplay.innerText = "error";
    throw new Error("invalid result");
  } else if (d.toString().length > 15) {
    d = d.toPrecision(12);
    storedMemory.splice(indx, 0, d);
  } else {
    storedMemory.splice(indx, 0, d.toString()); //paste result into stored Memory
  }
}
//calculate an equation
function singleCalculation(equation) {
  let a = parseFloat(equation[0]); //number
  let b = equation[1]; //operator
  let c = parseFloat(equation[2]); //number
  if (b === "/") {
    d = a / c;
    return d;
  } else if (b === "x") {
    d = a * c;
    return d;
  } else if (b === "+") {
    d = a + c;
    return d;
  } else if (b === "-") {
    d = a - c;
    return d;
  }
}
