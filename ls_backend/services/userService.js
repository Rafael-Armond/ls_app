import { UserRepository } from '../repositories/userRepository.js';

const userRepository = new UserRepository();

export class UserService {
    createUser(request, reply) {
        const listUsers = request.body;
        userRepository.addUser(listUsers);

        return reply.status(201).send();
    }
    deleteUser(request, reply) {
        const userId = request.params.id;
        userRepository.deleteUser(userId);

        return reply.status(204).send();
    }
    updateUser(request, reply) {
        const userId = request.params.id;
        const user = request.body;
        userRepository.updateUser(userId, user);

        return reply.status(204).send();
    }
    async getAllUsers() {
        const users = await userRepository.getAllUsers();

        return users;
    }
}