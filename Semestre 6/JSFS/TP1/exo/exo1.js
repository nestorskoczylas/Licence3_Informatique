import http from 'http';
import { URL } from 'url';

const BASE = 'http://localhost/';

// création du serveur
const server = http.createServer(
  (request, response) => {

      // création et envoi de la réponse
      response.statusCode = 200;
      response.setHeader( 'Content-Type' , 'text/plain');

      response.write(`Second node server ${response.statusCode}`);
      response.end();
  }
);

server.listen(8080);           // démarrage du serveur au port 8080