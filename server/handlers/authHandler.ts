import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from "../api";
import { signJwt } from "../auth";
import { db } from "../datastore";
import { ExpressHandlerRequest, User } from "../types";
import crypto from 'crypto';

export const registerHandler: ExpressHandlerRequest<RegisterUserRequest, RegisterUserResponse> = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ error: 'Missing required information' });
        return;
    }

    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
        res.status(400).send({ error: 'User already exists' });
        return;
    }
    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        email,
        password: crypto.pbkdf2Sync(password, process.env.PASSWORD_SECRET!, 1000, 64, 'sha512').toString('hex')
    };
    await db.createUser(user);
    const jwt = signJwt({ userId: user.id });
    res.status(201).send({ jwt });
}


export const loginHandler: ExpressHandlerRequest<LoginUserRequest, LoginUserResponse> = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ error: 'Missing required information' });
        return;
    }

    const user = await db.getUserByEmail(email);
    const hashedPassword = crypto.pbkdf2Sync(password, process.env.PASSWORD_SECRET!, 1000, 64, 'sha512').toString('hex');
    if (!user || user.password !== hashedPassword) {
        res.status(400).send({ error: 'Invalid email or password' });
        return;
    }

    const jwt = signJwt({ userId: user.id });

    res.send({ user , jwt });
}
