import { ApartmentDao } from "./dao/ApartmentDao";
import { UserDao } from "./dao/UserDao";
import { InMemoryDataStore } from "./memorydb";
import { SqlDataStore } from "./sql";

export interface DataStore extends UserDao, ApartmentDao {

}

export let db: DataStore;

export async function initDb() {
    db = await new SqlDataStore().openDb();
}