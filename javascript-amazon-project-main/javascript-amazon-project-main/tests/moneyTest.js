// that ../ means we are leaving the current folder, especially if it is not in the same folder. if it is in the same folder we use ./
import { formatCurrency } from "../scripts/utils/money.js";

// a group of related tests is called a test suite
console.log('test suite: formatCurrency');

// so this is how we give each test case a name;
// the naming convention is basically to describe what the code is doing
console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
}
else {
  console.log('failed');
}
// since we can't load a page from a javascript file, we had to create an html file.

// if we want to test formatCurrency in a different situation or with differnt numbers, we can just add some more test at the button.

console.log('works with 0');

if(formatCurrency(0) === '0.00') {
  console.log('passed');
}
else {
  console.log('failed');
}

// we are using 2000.5 as example because when we calculate the 10% tax, it can give a decimal. so here we want to see if it rounds up to the nearest decimal.

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
}
else {
  console.log('failed');
}

//so here we want to see if it rounds down to the nearest decimal.
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
}
else {
  console.log('failed');
}

// the last three test cases are edge cases, test with values that are tricky.the edge of what our code can handle