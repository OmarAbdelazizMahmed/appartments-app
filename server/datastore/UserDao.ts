import { User } from "../types";

export interface UserDao {
    createUser(user: User): User;
    getUserByEmail(email: string): User | null;
}

