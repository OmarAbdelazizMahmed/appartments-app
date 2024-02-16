import { Apartment } from "../types";

export interface ApartmentDao {
    listApartments(): Apartment[];
    getApartmentById(id: string): Apartment | null;
    createApartment(apartment: Apartment): Apartment;
    updateApartment(apartment: Apartment): Apartment;
    deleteApartment(id: string): boolean;
    searchApartments(search: string): Apartment[];
}