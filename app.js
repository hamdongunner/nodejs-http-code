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

   req.on('data', (data) => {
     buffer += decoder.write(data);
     console.log(buffer);
   });

   req.on('end', () => {
     buffer += decoder.end();
     console.log(buffer);
     res.end('Hello World');
   });

 });


// Listen on a port
 server.listen(3000, () => {
   console.log('listening on port 3000');
 });
