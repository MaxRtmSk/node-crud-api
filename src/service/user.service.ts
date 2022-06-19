import { randomUUID } from "crypto";
// import users from "../memory-db.json";
import fs from "fs";
import path from "path";

const users_file_path = path.join(__dirname, "../memory-db.json");

class UserService {
  getAll = () => {
    const jsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(jsonString.toString());
    return users;
  };

  getById = (id: any) => {
    const jsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(jsonString.toString());
    return users.find((user: any) => user.id === id);
  };

  create = (data: any) => {
    const id: any = randomUUID();
    const new_user: any = { id, ...data };

    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    const jsonString = JSON.stringify([new_user, ...users]);
    const buffer = Buffer.from(jsonString);

    fs.writeFile(users_file_path, buffer, (e) => {
      console.log(e);
    });

    return new_user;
  };

  update = (id: any, updateUser: any) => {
    const findPerson = this.getById(id);
    if (!findPerson) return false;

    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    users.forEach((user: any, index: number) => {
      if (user.id === id) {
        users[index].username = updateUser.username;
        users[index].age = updateUser.age;
        users[index].hobbies = updateUser.hobbies;
      }
    });

    const jsonString = JSON.stringify([...users]);
    const buffer = Buffer.from(jsonString);

    fs.writeFile(users_file_path, buffer, (e) => {
      console.log(e);
    });

    return this.getById(id);
  };

  remove = (id: any) => {
    const readJsonString = fs.readFileSync(users_file_path);
    const users = JSON.parse(readJsonString.toString());

    const removeIndex = users.map((user: any) => user.id).indexOf(id);
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
