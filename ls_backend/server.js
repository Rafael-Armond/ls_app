import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import { createUser, deleteUser, updateUser, getAllUsers } from './controllers/userController.js';

const server = fastify();
server.register(fastifyCors, {
    origin: "*",
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
});

// User
server.post('/users/create', createUser);
server.put('/users/update/:id', updateUser);
server.delete('/users/delete/:id', deleteUser);
server.get('/users/getAll', async () => {
    return getAllUsers();
});

server.listen({
    port: 3333,
});