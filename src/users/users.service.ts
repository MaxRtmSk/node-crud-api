import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import type { IUser } from "./interfaces/user.interface";

const users_file_path = path.join(__dirname, "../memory-db.json");

class UserService {
  getAll = async () => {
    const jsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(jsonString.toString());
    return users;
  };

  getById = async (id: string) => {
    const jsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(jsonString.toString());
    return users.find((user: IUser) => user.id === id);
  };

  create = async (data: CreateUserDto) => {
    const id: string = randomUUID();
    const new_user: IUser = { id, ...data };

    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    const jsonString = JSON.stringify([new_user, ...users]);
    const buffer = Buffer.from(jsonString);

    fs.writeFile(users_file_path, buffer, (e) => {
      console.log(e);
    });

    return new_user;
  };

  update = async (id: string, updateUser: UpdateUserDto) => {
    const findPerson = this.getById(id);
    if (!findPerson) return false;

    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    users.forEach((user: IUser, index: number) => {
      if (user.id === id) {
        users[index].username = updateUser.username;
        users[index].age = updateUser.age;
        users[index].hobbies = updateUser.hobbies;
      }
    });

    const jsonString = JSON.stringify([...users]);
    const buffer = Buffer.from(jsonString);

    fs.writeFileSync(users_file_path, buffer);

    const result = this.getById(id);

    return result;
  };

  remove = async (id: string) => {
    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    const removeIndex = users.map((user: IUser) => user.id).indexOf(id);
    if (removeIndex === -1) {
      return false;
    }

    users.splice(removeIndex, 1);

    const jsonString = JSON.stringify([...users]);
    const buffer = Buffer.from(jsonString);

    fs.writeFile(users_file_path, buffer, (e) => {
      console.log(e);
    });

    return true;
  };
}

export const userService = new UserService();
