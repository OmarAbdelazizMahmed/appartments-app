import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandlerRequest, User } from "../types";
import crypto from 'crypto';

export const registerHandler: ExpressHandlerRequest<RegisterUserRequest, RegisterUserResponse> = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ message: 'Missing required information' });
        return;
    }

    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
        res.status(400).send({ message: 'User already exists' });
        return;
    }

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        email,
        password
    };
    await db.createUser(user);

    res.status(201).send({ message: 'User created' });
}


export const loginHandler: ExpressHandlerRequest<LoginUserRequest, LoginUserResponse> = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ message: 'Missing required information' });
        return;
    }

    const user = await db.getUserByEmail(email);
    console.log(user?.password, password);
    if (!user || user.password !== password) {
        res.status(400).send({ message: 'Invalid email or password' });
        return;
    }

    res.send({ user });
}
