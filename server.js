const http = require('http');
const url = require('url');

const bodyParser = require('./src/util/bodyParser');
const routes = require('./src/routes');

const server = http.createServer((request, response) => {

   response.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
   
   const parsedUrl = url.parse(request.url, true);

   let { pathname } = parsedUrl;
   let id = null;

   const splitEndpoint = pathname.split('/').filter(Boolean);

   if(splitEndpoint.length > 1){
      pathname = `/${splitEndpoint[0]}/:id`;
      id = splitEndpoint[1];
   }

   const route = routes.find((routeObject) => (
      routeObject.endpoint === pathname && routeObject.method === request.method
   ));

   if(route){
      request.query = parsedUrl.query;
      request.params = { id };

      response.send = (statusCode, body) => {
         response.writeHead(statusCode, { 'Content-Type' : 'application/json' });
         response.end(JSON.stringify(body));
      }
      
      if(['POST', 'PUT', 'PATCH'].includes(request.method)){         
         bodyParser(request , () => route.handler(request, response));
      }else {
         route.handler(request, response);
      }

   }else {
      response.writeHead(404, { 'Content-type' : 'text/html'});
      response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
   }

});

module.exports = server