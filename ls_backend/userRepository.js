import * as fs from 'fs';
import * as readline from 'readline';

export class UserRepository {
    #fileName = './database/user.txt';

    addUser(listUsers) {
        listUsers.forEach(element => {
            const formatedData = Object.values(element).join(";");
            fs.appendFileSync(this.#fileName, formatedData + '\n', (err) => {
                if (err) {
                    console.error('Erro ao inserir os dados no arquivo:', err);
                    return;
                }
            });
        });
    }

    async deleteUser(id) {
        try {
            const users = await this.getAllUsers();
            if (users && users.length > 0) {
                const indexToRemove = users.findIndex(item => item.id == id);
                if (indexToRemove != -1) {
                    users.splice(indexToRemove, 1);
                    fs.truncateSync(this.#fileName, 0, (err) => {
                        if (err) {
                            console.error('Erro ao limpar o conteúdo do arquivo:', err);
                            return;
                        }
                    });
                    this.addUser(users);
                } else {
                    console.log("Nenhum usuário encontrado.");
                }
            } else {
                return;
            }
        } catch (err) {
            console.log("Erro ao deletar usuário:", err);
        }
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            const users = [];
            const reader = readline.createInterface({
                input: fs.createReadStream(this.#fileName),
                crlfDelay: Infinity
            });

            reader.on('line', (line) => {
                const data = line.split(';');
                const user = {
                    id: data[0],
                    uid: data[1],
                    password: data[2],
                    first_name: data[3],
                    last_name: data[4],
                    username: data[5],
                    email: data[6],
                    avatar: data[7],
                    gender: data[8],
                    phone_number: data[9],
                    social_insurance_number: data[10],
                    date_of_birth: data[11],
                    register: data[12]
                };
                users.push(user);
            });

            reader.on('close', () => {
                console.log('Leitura do arquivo finalizada.');
                resolve(users);
            });

            reader.on('error', (err) => {
                console.error('Erro ao ler o arquivo:', err);
                reject(err);
            });

            return users;
        });
    }

    async updateUser(id, data) {
        try {
            const users = await this.getAllUsers();
            if (users && users.length > 0) {
                const indexToRemove = users.findIndex(item => item.id == id);
                if (indexToRemove != -1) {
                    users.splice(indexToRemove, 1);
                    users.splice(indexToRemove, 0, data);
                    fs.truncateSync(this.#fileName, 0, (err) => {
                        if (err) {
                            console.error('Erro ao limpar o conteúdo do arquivo:', err);
                            return;
                        }
                    });
                    this.addUser(users);
                } else {
                    console.log("Nenhum usuário encontrado.");
                }
            } else {
                return;
            }
        } catch (err) {
            console.log("Erro ao deletar usuário:", err);
        }
    }
}