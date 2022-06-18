import { randomUUID } from "crypto";
import { users } from "../memory-db";

class UserService {
  getAll = () => {
    return users;
  };

  getById = (id: any) => {
    return users.find((user: any) => user.id === id);
  };

  create = (data: any) => {
    const id: any = randomUUID();
    const new_user = { id, ...data };
    users.push(new_user);
    return users[users.length - 1];
  };

  update = (id: any, updatePerson: any) => {
    const findPerson = this.getById(id);
    if (!findPerson) return false;
    users.forEach((user: any, index: number) => {
      if (user.id === id) {
        users[index].name = updatePerson.name;
        users[index].age = updatePerson.age;
        users[index].hobbies = updatePerson.hobbies;
      }
    });
    return this.getById(id);
  };

  remove = (id: any) => {
    const removeIndex = users.map((user: any) => user.id).indexOf(id);
    if (removeIndex === -1) {
      return false;
    }
    users.splice(removeIndex, 1);
    return true;
  };
}

export const userService = new UserService();
