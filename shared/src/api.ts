import { Apartment, User } from "./types";

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

export type RegisterUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;

export interface RegisterUserResponse {
    jwt?: string;
    message?: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export type LoginUserResponse = {
    user?: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
    jwt?: string;
    message?: string;
}