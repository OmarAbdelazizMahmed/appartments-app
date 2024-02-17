import { User } from "../../../shared/src/types";

export interface UserDao {
    createUser(user: User): Promise<User>;
    getUserByEmail(email: string): Promise<User | null | undefined>;
    getUserById(id: string): Promise<User | null | undefined>;
}

