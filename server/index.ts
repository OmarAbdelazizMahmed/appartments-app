import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createApartmentHandler, listApartmentsHandler } from './handlers/apartmentHandler';
import expressAsyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { loginHandler, registerHandler } from './handlers/userHandler';

(async () => {

    await initDb();

    const app = express();

    app.use(express.json());


    const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    }

    app.use(requestLoggerMiddleware);

    app.get('/apartments',  expressAsyncHandler(listApartmentsHandler));

    // show a specific apartment
    // app.get('/apartments/:id', getApartmentHandler);

    // add a new apartment
    app.post('/apartments',  expressAsyncHandler(createApartmentHandler));

    app.post('/register',  expressAsyncHandler(registerHandler));
    app.post('/login',  expressAsyncHandler(loginHandler));

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong' });
    }

    app.use(errorHandler);

    app.listen(3000);
})();