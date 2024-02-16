import { ApartmentDao } from "./ApartmentDao";
import { UserDao } from "./UserDao";
import { InMemoryDataStore } from "./memorydb";

export interface DataStore extends UserDao, ApartmentDao {

}

export const db = new InMemoryDataStore();