//we are loading the orders fromstorage. since this will be a string, we convert it back into an array using JSON.parse. SINCE in the beginning we are not going to have anything in localStorage,we give it a default value that's; or [] (|| [])
export const orders = JSON.parse(localStorage.getItem('orders')) || [];
//export const orders = [];
// .unshift makes our order infront of the array. Because we want the recent orders at the top.
// we have created a function for adding an order to the array above. we have giving the function an order object(order parameter)
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

// localStorage only supports strings. we also used a localStorage key 'orders'. when we modify the array we saveToStorage
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}