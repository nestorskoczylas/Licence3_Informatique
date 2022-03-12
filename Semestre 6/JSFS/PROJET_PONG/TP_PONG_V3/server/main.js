import http from 'http';
import RequestController from './controllers/requestController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

server.listen(8000);
