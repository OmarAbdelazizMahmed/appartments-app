import { JwtObject } from "../shared/src/types";
import jwt from 'jsonwebtoken';

export function signJwt(obj: JwtObject): string {
    const secret = getJwtSecret();
    return jwt.sign(obj, secret, { expiresIn: '1h' });
}

export function verifyJwt(token: string): JwtObject {
    const secret = getJwtSecret();
    return jwt.verify(token, secret) as JwtObject;
}

function getJwtSecret() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET not set');
    }
    return process.env.JWT_SECRET;
}