import path from "path";
import { writeFile } from "fs/promises";

const users_file_path = path.join(__dirname, "../memory-db.json");

export const clearDB = async () => {
  await writeFile(users_file_path, Buffer.from(JSON.stringify([])));
};
