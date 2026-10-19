// calculator project: the final project from the foundation path

// the math functions 
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {

    if (b === 0) {
        alert("ERROR: You can't divide by 0!");
    }
    return a / b;
}

// #region test the math functions
// console.log(add(2, 3)); // 5
// console.log(subtract(5, 2)); // 3
// console.log(multiply(4, 3)); // 12
// console.log(divide(10, 2)); // 5
// // edge case: divide by zero
// try {
//     console.log(divide(10, 0)); // Error: Cannot divide by zero
// } catch (error) {
//     console.error(error.message);
// }
// #endregion

// the operate function 
function operate(operator, a, b) {

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}

// #region test the operate function
// console.log(operate('+', 2, 3)); // 5
// console.log(operate('-', 5, 2)); // 3
// console.log(operate('*', 4, 3)); // 12
// console.log(operate('/', 10, 2)); // 5
// // edge case: divide by zero
// try {
//     console.log(operate('/', 10, 0)); // Error: Cannot divide by zero
// } catch (error) {
//     console.error(error.message);
// }
// // edge case: invalid operator  
// try {
//     console.log(operate('%', 10, 2)); // Error: Invalid operator
// } catch (error) {
//     console.error(error.message);
// }
// #endregion


// select each button and assign it to a variable
// control buttons selectors:
const btnClear = document.getElementById('btn-clear');
const btnBackspace = document.getElementById('btn-backspace');

// digits buttons selectors:
const digitButtons = document.querySelectorAll('.digit');

// operators buttons selectors:
let operatorButtons = document.querySelectorAll('.operator')

// other buttons selectors:
const btnDot = document.getElementById('btn-dot');
const btnEquals = document.getElementById('btn-equals');

// screen selectors:
const screenCurrent = document.querySelector('.screen-current');
const screenLast = document.querySelector('.screen-last');

// state variables:
let currentInput = '';
let lastInput = '';
let operator = '';
let waitingForSecond = false;
let isCalculated = false;


// handling functions 

function clearScreen() {
    // reset state variables
    currentInput = '';
    lastInput = '';
    operator = '';
    waitingForSecond = false;
    isCalculated = false;

    // reset the screen
    screenCurrent.textContent = '0';
    screenLast.textContent = '';
}

function backspace() {
    // if the user pressed an operator 
    if (waitingForSecond) return;

    // remove the last character from currentInput
    currentInput = currentInput.slice(0, -1);

    // if it is empty make it 0
    if (currentInput === '') {
        currentInput = '0';
    }

    // update the screen
    screenCurrent.textContent = currentInput;
}

// for digits 
function handleDigit(number) {

    if (isCalculated) {
        // clear the screen 
        clearScreen();

        // start a new calculation with the new number
        isCalculated = false;
    }

    // if the user pressed an operator (waiting for the second number)
    if (waitingForSecond) {
        currentInput = number;
        waitingForSecond = false;
    }
    else { // the user is still entering the first number
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    // update the screen
    screenCurrent.textContent = currentInput;
}

// for operators
function handleOperator(op) {
    let displayOp = op === '*' ? '×' : op === '/' ? '÷' : op;

    // if the user made a calculation, and then pressed an operator
    if (isCalculated) {
        // use the result as the first number for the next operation
        lastInput = currentInput;
        operator = op;
        waitingForSecond = true;
        isCalculated = false;

        // update the screen
        screenLast.textContent = `${lastInput} ${displayOp}`;
        return;
    }

    // if the user is waiting for the second number, update the operator and screen
    if (waitingForSecond) {
        operator = op;
        screenLast.textContent = `${lastInput} ${displayOp}`;
        return;
    }

    // if lastInput, operator, and currentInput have values, perform the operation and update the screen
    if (lastInput !== '' && operator !== '' && currentInput !== '') {
        const result = operate(operator, parseFloat(lastInput), parseFloat(currentInput));
        currentInput = result.toString();
        screenCurrent.textContent = currentInput;
    }

    // check if the user has entered a number before pressing the operator
    if (currentInput === '') return; // do nothing if current input is empty
    if (waitingForSecond) return; // do nothing if waiting for the second number

    // save the current input into first first number
    lastInput = currentInput;

    // set the right operator value
    operator = op;

    waitingForSecond = true;

    // update the screen
    let displayOperator = op;
    if (op === '*') displayOperator = '×';
    if (op === '/') displayOperator = '÷';

    screenLast.textContent = `${lastInput} ${displayOperator}`;
}

// for equals
function handleEquals() {

    // NOTICE: i wrote this code if i want to prevent any output if the user didn't enter the second number and pressed '=' 
    // i thought it was a bug that way
    // but after reading about it, turned out to be an intended feature
    // so i made it optional by separating it, and commenting it out, and you can uncomment it if you want to use it

    /*
    // if the user pressed equals without entering the second number,
    if (waitingForSecond){
        // update the screen to show an error message and return
        screenCurrent.textContent = `INVALID EXPRESSION`;
        return;
    } 
    */

    // check if the user has entered a number before pressing the equals button
    if (currentInput === '' || lastInput === '' || operator === '') return; // do nothing if any input is empty

    // perform the operation
    const result = operate(operator, parseFloat(lastInput), parseFloat(currentInput));

    // update the screen
    screenCurrent.textContent = parseFloat(result.toFixed(4));

    // make sure to handle division by zero case
    if (operator === '/' && parseFloat(currentInput) === 0) {
        screenLast.textContent = `${lastInput} ÷ ${currentInput} =`;
        screenCurrent.textContent = 'ERROR'
        return;
    } else {
        // fix the operator symbol for display purposes
        let displayOp = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
        // if (operator === '/') {
        //     operator = '÷';
        // }
        // if (operator === '*') {
        //     operator = '×';
        // }

        screenLast.textContent = `${lastInput} ${displayOp} ${currentInput} =`;
    }

    // reset state variables for next operation
    currentInput = result;
    lastInput = '';
    operator = '';
    waitingForSecond = true;
    isCalculated = true;

}

// for decimal
function handleDecimal() {
    // if the user pressed an operator (waiting for the second number)
    if (waitingForSecond) {
        currentInput = '0.';
        waitingForSecond = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    // update the screen
    screenCurrent.textContent = currentInput;
}

// clear the screen
btnClear.addEventListener("click", () => {
    clearScreen();
});

// remove (undo) the last input 
btnBackspace.addEventListener("click", () => {
    backspace();
});

// digit buttons event listeners
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleDigit(button.textContent);
    });
});

// decimal button event listener
btnDot.addEventListener("click", handleDecimal);

// operator buttons event listeners
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        // set the operator value
        let op;
        if (button.id === 'btn-multiply') op = '*';
        else if (button.id === 'btn-divide') op = '/';
        else op = button.textContent;

        // handle the operator input
        handleOperator(op);
    });
});

// equals button event listener
btnEquals.addEventListener("click", () => {
    handleEquals();
});

// handle keyboard input
document.addEventListener("keydown", (event) => {

    // digit keys
    if (event.key >= '0' && event.key <= '9') {
        handleDigit(event.key);
    }

    // operation keys
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        handleOperator(event.key)
    }

    // equals key (enter)
    if (event.key === 'Enter' || event.key === '=') {
        handleEquals();
    }

    // clear key
    if (event.key === 'c' || event.key === 'C') {
        clearScreen();
    }

    // backspace key
    if (event.key === 'Backspace') {
        backspace();
    }

    // decimal key
    if (event.key === '.') {
        handleDecimal();
    }
});