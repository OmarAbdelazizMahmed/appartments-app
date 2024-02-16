import { RequestHandler } from "express";

export type ExpressHandlerRequest<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface Apartment {
    id: string;
    userId: string;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
    createdAt: number;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}



export interface ApartmentUpdate {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
}

