import { UserService } from '../services/userService.js';

const userService = new UserService();

export const createUser = (request, reply) => {
    userService.createUser(request, reply);
};

export const deleteUser = (request, reply) => {
    userService.deleteUser(request, reply);
};

export const updateUser = (request, reply) => {
    userService.updateUser(request, reply);
};

export const getAllUsers = async () => {
    return await userService.getAllUsers();
};