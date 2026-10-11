 export function formatCurrency(priceCents) {
  //we included math.round, so that before we get to toFixed , it has rounded to the neerest decimal number before it fixes to two decimsl point. toFixed won't round it up
  
  // we are returning it, so that we use it out of the function.
  return (Math.round(priceCents) / 100).toFixed(2);
}

//export default formatCurrency;
// so when we import this. Example; import formatCurrency from "";
// notice there is no {} that is called default export.
// note: each file can only have one default export.