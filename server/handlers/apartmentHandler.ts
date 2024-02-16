import { RequestHandler } from "express";
import { db } from "../datastore";
import { Apartment, ApartmentCreateRequest, ApartmentCreateResponse, ExpressHandlerRequest } from "../types";
import crypto from 'crypto';

export const listApartmentsHandler: ExpressHandlerRequest<{}, {}> = (req, res) => {
    res.send({ apartments: db.listApartments() });
}


export const getApartmentHandler: RequestHandler = (req, res) => {
    const id = req.params.id;
    const apartment = db.getApartmentById(id);
    if (apartment) {
        res.send(apartment);
    } else {
        res.status(404).send({ message: 'Apartment not found' });
    }
}

export const createApartmentHandler: ExpressHandlerRequest<ApartmentCreateRequest, ApartmentCreateResponse> = (req, res) => {
    
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.location || !req.body.image || !req.body.userId) {
        res.status(400).send({ message: 'Missing required information' });
        return;
    }
    const apartment: Apartment = {
        id: crypto.randomUUID(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        image: req.body.image,
        createdAt: Date.now(),
        userId: req.body.userId
    };
    db.createApartment(apartment);
    res.send(apartment);
}

export const updateApartmentHandler: RequestHandler = (req, res) => {
    const apartment = req.body;
    db.updateApartment(apartment);
    res.send(apartment);
}

