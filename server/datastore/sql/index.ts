import { DataStore } from "..";
import { User, Apartment } from "../../types";
import sqlite3 from "sqlite3";
import { Database, open as sqliteOpen } from "sqlite";
import path from "path";

export class SqlDataStore implements DataStore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async openDb() {
        this.db = await sqliteOpen({
            filename: path.join(__dirname, "apartments.db"),
            driver: sqlite3.Database
        });
        this.db.run("PRAGMA foreign_keys = ON");
        await this.db.migrate({
            migrationsPath: path.join(__dirname, "migrations"),
        });
        return this;
    }
    async createUser(user: User): Promise<User> {
        await this.db.run("INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
            user.id, user.firstName, user.lastName, user.email, user.password);
        return user;
    }
    getUserByEmail(email: string): Promise<User | null | undefined> {
        return this.db.get<User | null>("SELECT * FROM users WHERE email = ?", email);
    }

    getUserById(id: string): Promise<User | null | undefined> {
        return this.db.get<User | null>("SELECT * FROM users WHERE id = ?", id);
    }

    listApartments(): Promise<Apartment[]> {
        return this.db.all<Apartment[]>("SELECT * FROM apartments");
    }
    getApartmentById(id: string): Promise<Apartment | null> {
        throw new Error("Method not implemented.");
    }
    async createApartment(apartment: Apartment): Promise<Apartment> {
        await this.db.run("INSERT INTO apartments (id, title, description, price, location, image, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            apartment.id, apartment.title, apartment.description, apartment.price, apartment.location, apartment.image, apartment.createdAt, apartment.userId);
        return apartment;
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