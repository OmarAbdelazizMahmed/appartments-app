import { DataStore } from "..";
import { User, Apartment } from "../../types";

export class InMemoryDataStore implements DataStore{
    private users: User[] = [];
    private apartments: Apartment[] = [];
    createUser(user: User): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }
    getUserByEmail(email: string): Promise<User | null> {
        let user = this.users.find((user) => user.email === email);
        return Promise.resolve(user || null);
    }

    getUserById(id: string): Promise<User | null> {
        let user = this.users.find((user) => user.id === id);
        return Promise.resolve(user || null);
    }

    listApartments(): Promise<Apartment[]> {
        return Promise.resolve(this.apartments);
    }
    getApartmentById(id: string): Promise<Apartment | null> {
        let apartment = this.apartments.find((apartment) => apartment.id === id);
        return Promise.resolve(apartment || null);
    }
    createApartment(apartment: Apartment): Promise<Apartment> {
        this.apartments.push(apartment);
        return Promise.resolve(apartment);
    }
    updateApartment(apartment: Apartment): Promise<Apartment> {
        this.apartments = this.apartments.map((a) => {
            if(a.id === apartment.id){
                return apartment;
            }
            return a;
        }
        );
        return Promise.resolve(apartment);
    }
    deleteApartment(id: string): Promise<boolean> {
        this.apartments = this.apartments.filter((a) => a.id !== id);
        return Promise.resolve(true);
    }
    searchApartments(search: string): Promise<Apartment[]> {
        let apartments = this.apartments.filter((apartment) => apartment.title.toLowerCase().includes(search.toLowerCase()));
        return Promise.resolve(apartments);
    }
}