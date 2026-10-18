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
        alert("You can't divide by 0!");
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
