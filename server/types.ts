import { RequestHandler } from "express";

export type ExpressHandlerRequest<Req, Res> = RequestHandler<string, Partial<WithError<Res>>, Partial<Req>, any>;

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

export interface JwtObject {
    userId: string;
}

export type WithError<T> = T & { error?: string };