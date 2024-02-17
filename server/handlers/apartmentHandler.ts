import { RequestHandler } from "express";
import { db } from "../datastore";
import { Apartment, ExpressHandlerRequest } from "../types";
import crypto from 'crypto';
import { CreateApartmentRequest, CreateApartmentResponse, GetApartmentRequest, GetApartmentResponse, listApartmentsRequest, listApartmentsResponse } from "../api";

export const listApartmentsHandler: ExpressHandlerRequest<listApartmentsRequest, listApartmentsResponse> = async (req, res) => {
    res.send({ apartments: await db.listApartments() });
}


export const getApartmentHandler:RequestHandler = async (req, res) => {
    const id = req.params.id;
    const apartment = await db.getApartmentById(id);
    if (apartment) {
        res.send(apartment);
    } else {
        res.status(404).send({ message: 'Apartment not found' });
    }
}

export const createApartmentHandler: ExpressHandlerRequest<CreateApartmentRequest, CreateApartmentResponse> = async (req, res) => {
    // validation checks

    if (!req.body.title || !req.body.description || !req.body.price || !req.body.location || !req.body.image || !req.body.userId) {
        res.status(400).send({ error: 'Missing required information' });
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
        userId: res.locals.user.id
    };
    await db.createApartment(apartment);
    res.sendStatus(201);
}

export const updateApartmentHandler: RequestHandler = async (req, res) => {
    const apartment = req.body;
    await db.updateApartment(apartment);
    res.send(apartment);
}

