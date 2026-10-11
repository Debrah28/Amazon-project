 export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
 }, {
   id: '2',
  deliveryDays: 3,
  priceCents: 499
 }, {
   id: '3',
  deliveryDays: 1,
  priceCents: 999
 }
];

 export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

 deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  }
 }); 

 // we are giving it a default value, if we don't find a deliveryOption. we want to use the default operator OR (||)
 return deliveryOption || deliveryOptions[0] ;
  
}