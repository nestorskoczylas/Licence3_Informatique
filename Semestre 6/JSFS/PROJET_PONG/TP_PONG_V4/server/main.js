import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO, Socket } from 'socket.io'
import SocketController from './controllers/socketController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);

const socketController = new SocketController(io);

server.listen(8000);
