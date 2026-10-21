// let generate an object using the class XMLHttpRequest.
// new XMLHttpRequest() this creates a new HTTP message to send to backend
const xhr = new XMLHttpRequest();
// we added eventlistener because when sending a request it takes time and when we want to get back the response, it will take time aswell. so this method waits for an event and then it can run a function. so give it the parameter 'load' which means the response has loaded, and the next parameter is the function we want to run. That is why we put the code in line 11 instead here, so it won't show undefined in the console.
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
// So to setup a request, we set it to open and open has two parameters, 1st, the type of information we can send and 2nd, tells the computer where to send it to. so 'GET' here is to get some information from the backend
xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.open('GET', 'https://supersimplebackend.dev/not-supported'); try this and you will see backend only supports a certain set of url paths.
// xhr.open('GET', 'https://supersimplebackend.dev/products/first'); for a json content-type
// xhr.open('GET', 'https://supersimplebackend.dev/documentation'); for a HTML content-type
// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); for a image content-type
xhr.send();
// xhr.response