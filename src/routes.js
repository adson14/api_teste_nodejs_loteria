const {create,read, premiacao, readById, restart } = require("./controllers/BilheteController");

 
 module.exports = [
      {
        endpoint: '/bilhete',
        method : 'GET',
        handler: read,
     },
     {
        endpoint: '/bilhete/:id',
        method : 'GET',
        handler: readById,
     },
     {
        endpoint: '/bilhete',
        method : 'POST',
        handler: create,
     },     
     {
        endpoint: '/premiacao',
        method : 'POST',
        handler: premiacao,
     },     
     {
        endpoint: '/restart',
        method : 'GET',
        handler: restart,
     },

 
 ]