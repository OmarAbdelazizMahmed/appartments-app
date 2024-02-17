import { verifyJwt } from "../auth";
import { db } from "../datastore";
import { ExpressHandlerRequest } from "../types";

export const authMiddleware: ExpressHandlerRequest<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }

    try {
        const payload = verifyJwt(token);
        const user = await db.getUserById(payload.userId);
        if (!user) {
            throw new Error('User not found');
        }
        res.locals.user = user;
    } catch (e) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }


    next();

}