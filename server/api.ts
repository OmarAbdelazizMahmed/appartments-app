import { Apartment } from "./types";

export type CreateApartmentRequest = Pick<Apartment, 'title' | 'description' | 'price' | 'location' | 'image' | 'userId'>;

export type CreateApartmentResponse = {
}

export type listApartmentsRequest = {}

export type listApartmentsResponse = {
    apartments: Apartment[];
}

export type GetApartmentRequest = {}
export type GetApartmentResponse = {
    apartment: Apartment;
}