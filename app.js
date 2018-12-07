/*
 * Main file
 */

 // Dependecies
 const http = require('http');
 const url = require('url');
 const StringDecoder = require('string_decoder').StringDecoder;



// Create a server so it can deal with our requestes
 let server = http.createServer((req, res) => {

   // Getting the full data from the url
   let parsedUrl = url.parse(req.url, true);

   // Knowing what reoute the user is calling
   let path = parsedUrl.pathname;

   // Using regex to remove the slashes in the start of the path and the end of it
   var trimmedPath = path.replace(/^\/+|\/+$/g, '');

   // Getting Methods POST GET PUT DELETE
   let method = req.method.toLowerCase();

   // Getting the Query and save it in object
   let queryObject = parsedUrl.query;

   // Getting the headers
   let headers = req.headers;

   // Creating new object of StringDecoder
   let decoder = new StringDecoder('utf-8');

   let buffer = '';

   // When the request start sending data (payload)
   req.on('data', (data) => {
     buffer += decoder.write(data);
   });

   // When the request stop sending data (payload)
   req.on('end', () => {
     buffer += decoder.end();

     // Choosing a function that should be called
     let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

     // Setting the data we have got from the requesr so we can send them to the chosenHandler
     let data = {
       'method': method,
       'query': queryObject,
       'payload': buffer,
       'headers': headers
     }

     // Calling the chosenHandler
     chosenHandler(data, (statusCode, returnedData) => {

       // Handling the casr when the below function does not send a valid status code
       statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

       // Handling the casr when the below function does not send a valid object
       returnedData = typeof(returnedData) == 'object' ? returnedData : {};

       // Coverting the object to a string
       let stringPayload = JSON.stringify(returnedData);

       res.setHeader('Content-Type','application/json');

       // Returning the status code in the header
       res.writeHeader(statusCode);

       // Returning the information in the header
       res.end(stringPayload);
     });
   });
 });


let handlers = {};

handlers.home = function (data, callback) {
  callback(200, {'location':'home'});
};

handlers.users = function (data, callback) {
  callback(200, {'location':'users'});
};

handlers.notFound = function (data, callback) {
  callback(404);
};

let router = {
  'home': handlers.home,
  'users': handlers.users
};



// Listen on a port
 server.listen(3000, () => {
   console.log('listening on port 3000');
 });
