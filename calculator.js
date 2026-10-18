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

const btnAdd = document.getElementById('btn-add');
const btnSubtract = document.getElementById('btn-subtract');
const btnMultiply = document.getElementById('btn-multiply');
const btnDivide = document.getElementById('btn-divide');

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

// clear the screen
btnClear.addEventListener("click", () => {
    // reset state variables
    currentInput = '0';
    lastInput = '';
    operator = '';
    waitingForSecond = false;

    // reset the screen
    screenCurrent.textContent = '0';
    screenLast.textContent = '';
});

// remove (undo) the last input 
btnBackspace.addEventListener("click", () => {
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
});

// digit buttons event listeners
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.textContent;

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
    });
});

// operator buttons event listeners
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

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
        if (button.id === 'btn-multiply') {
            operator = '*';
        } else if (button.id === 'btn-divide') {
            operator = '/';
        } else {
            operator = button.textContent;
        }

        waitingForSecond = true;

        // update the screen
        screenLast.textContent = `${lastInput} ${button.textContent}`;
    });
});

// equals button event listener
btnEquals.addEventListener("click", () => {
    // check if the user has entered a number before pressing the equals button
    if (currentInput === '' || lastInput === '' || operator === '') return; // do nothing if any input is empty

    // perform the operation
    const result = operate(operator, parseFloat(lastInput), parseFloat(currentInput));

    // update the screen
    screenCurrent.textContent = result.toFixed(4);

    // make sure to handle division by zero case
    if (operator === '/' && parseFloat(currentInput) === 0) {
        screenLast.textContent = `${lastInput} ${operator} ${currentInput} = ERROR`;
        return;
    } else {
        // fix the operator symbol for display purposes
        if (operator === '/') {
            operator = '÷';
        }
        if (operator === '*') {
            operator = '×';
        }

        screenLast.textContent = `${lastInput} ${operator} ${currentInput} =`;
    }

    // reset state variables for next operation
    currentInput = result;
    lastInput = '';
    operator = '';
    waitingForSecond = false;
});

