import { formatCurrency } from "../../scripts/utils/money.js";
// describe is used by Jasmine, in order to create a test suite. a string is used to give the test suite a name.
// it() is another function provided by Jasmine, it is used to create a test. to name our test, we give it a string.
// to put some code in Jasmine, we give it a second parameter, that is a function
// expect() let us compare a value to another value, so instead of using the if statement. if (formatCurrency(2095) === '20.95') {
 // console.log('passed');}
// else { console.log('failed');}
// expect gives us an object, that object is called toEqual
describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});
// we can use describe inside describe; example;
//describe('test suite: formatCurrency', () => { describe('rounding', () => {