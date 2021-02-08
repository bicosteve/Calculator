const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
  //Replace current dislpay value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.innerText = number;
    awaitingNextValue = false;
  } else {
    /* 
  if current display value is 0 replace it else add number
  //calculatorDisplay.innerText = number; 
  */

    const displayValue = calculatorDisplay.innerText;
    calculatorDisplay.innerText =
      displayValue === '0' ? number : displayValue + number;
  }
};

//for Decimal event
const addDecimal = () => {
  //if operator pressed, do not add decimal
  if (awaitingNextValue) return;

  /*
  //If no decimal, add one
  if calculatorDisplay.innertext does not include . add the innertext display and a .
  This will make sure the decimal is added only once
  */
  if (!calculatorDisplay.innerText.includes('.')) {
    calculatorDisplay.innerText = `${calculatorDisplay.innerText}.`;
  }
};

//Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

//Use operator
const useOperator = (operator) => {
  const currentValue = parseInt(calculatorDisplay.innerText); //use parseInt or Number
  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  //Asign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.innerText = calculation;
    firstValue = calculation;
  }
  //Ready for the next value store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

//Add eventListerner for numbers operators and decimals
inputButtons.forEach((inputButton) => {
  if (inputButton.classList.length === 0) {
    inputButton.addEventListener('click', () =>
      sendNumberValue(inputButton.value)
    );
  } else if (inputButton.classList.contains('operator')) {
    inputButton.addEventListener('click', () => useOperator(inputButton.value));
  } else if (inputButton.classList.contains('decimal')) {
    inputButton.addEventListener('click', () => addDecimal());
  }
});

//Reset display, and all values
const resetAll = () => {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
};

//Event Listerner for clear button
clearButton.addEventListener('click', () => resetAll());
