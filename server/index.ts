import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createApartmentHandler, listApartmentsHandler } from './handlers/apartmentHandler';
import expressAsyncHandler from 'express-async-handler';
import { initDb } from './datastore';

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

    app.post('/login', (req, res) => {
        res.send('User logged in');
    });

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong' });
    }

    app.use(errorHandler);

    app.listen(3000);
})();