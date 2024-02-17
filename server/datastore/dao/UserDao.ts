import { User } from "../../types";

export interface UserDao {
    createUser(user: User): Promise<User>;
    getUserByEmail(email: string): Promise<User | null | undefined>;
}

