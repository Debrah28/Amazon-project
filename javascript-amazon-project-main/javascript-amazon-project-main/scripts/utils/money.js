 export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

//export default formatCurrency;
// so when we import this. Example; import formatCurrency from "";
// notice there is no {} that is called default export.
// note: each file can only have one default export.