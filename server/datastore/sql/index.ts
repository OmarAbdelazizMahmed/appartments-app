import { DataStore } from "..";
import { User, Apartment } from "../../types";
import sqlite3 from "sqlite3";
import { open as sqliteOpen } from "sqlite";
import path from "path";

export class SqlDataStore implements DataStore {
    public async openDb() {
        const db = await sqliteOpen({
            filename: path.join(__dirname, "apartments.db"),
            driver: sqlite3.Database
        });
        await db.migrate({
            migrationsPath: path.join(__dirname, "migrations"),
        });
        return this;
    }
    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    listApartments(): Promise<Apartment[]> {
        throw new Error("Method not implemented.");
    }
    getApartmentById(id: string): Promise<Apartment | null> {
        throw new Error("Method not implemented.");
    }
    createApartment(apartment: Apartment): Promise<Apartment> {
        throw new Error("Method not implemented.");
    }
    updateApartment(apartment: Apartment): Promise<Apartment> {
        throw new Error("Method not implemented.");
    }
    deleteApartment(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    searchApartments(search: string): Promise<Apartment[]> {
        throw new Error("Method not implemented.");
    }
    
}