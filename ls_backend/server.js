import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import { UserRepository } from './userRepository.js';

const server = fastify();
server.register(fastifyCors, {
    origin: "*",
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
});

const userRepository = new UserRepository();

server.post('/users/create', (request, reply) => {
    const listUsers = request.body;
    userRepository.addUser(listUsers);

    return reply.status(201).send();
});

server.delete('/users/delete/:id', (request, reply) => {
    const userId = request.params.id;
    userRepository.deleteUser(userId);

    return reply.status(204).send();
});

server.put('/users/update/:id', (request, reply) => {
    const userId = request.params.id;
    const user = request.body;
    console.log("put id: ", userId);
    console.log("put user: ", user);
    userRepository.updateUser(userId, user);

    return reply.status(204).send();
});

server.get('/users/getAll', async () => {
    const users = await userRepository.getAllUsers();
    return users;
});

server.listen({
    port: 3333,
});