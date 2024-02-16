import { Apartment } from "../../types";

export interface ApartmentDao {
    listApartments(): Promise<Apartment[]>;
    getApartmentById(id: string): Promise<Apartment | null>;
    createApartment(apartment: Apartment): Promise<Apartment>;
    updateApartment(apartment: Apartment): Promise<Apartment>;
    deleteApartment(id: string): Promise<boolean>;
    searchApartments(search: string): Promise<Apartment[]>;
}