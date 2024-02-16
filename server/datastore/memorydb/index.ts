import { DataStore } from "..";
import { User, Apartment } from "../../types";

export class InMemoryDataStore implements DataStore{
    private users: User[] = [];
    private apartments: Apartment[] = [];
    createUser(user: User): User {
        this.users.push(user);
        return user;
    }
    getUserByEmail(email: string): User | null {
        let user = this.users.find((user) => user.email === email);
        return user || null;
    }
    listApartments(): Apartment[] {
        return this.apartments;
    }
    getApartmentById(id: string): Apartment | null {
        let apartment = this.apartments.find((apartment) => apartment.id === id);
        return apartment || null;
    }
    createApartment(apartment: Apartment): Apartment {
        this.apartments.push(apartment);
        return apartment;
    }
    updateApartment(apartment: Apartment): Apartment {
        this.apartments = this.apartments.map((a) => {
            if(a.id === apartment.id){
                return apartment;
            }
            return a;
        }
        );
        return apartment;
    }
    deleteApartment(id: string): boolean {
        this.apartments = this.apartments.filter((a) => a.id !== id);
        return true;
    }
    searchApartments(search: string): Apartment[] {
        return this.apartments.filter((a) => a.title.includes(search));
    }
}