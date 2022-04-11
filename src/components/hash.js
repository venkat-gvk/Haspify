import { v4 as uuidv4 } from "uuid";

export const hash = () => {
  const hashed = uuidv4();
  return hashed.slice(1, 7);
};
