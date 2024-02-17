import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createApartmentHandler, getApartmentHandler, listApartmentsHandler } from './handlers/apartmentHandler';
import expressAsyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { loginHandler, registerHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/errorMiddleware';
import { errorHandler } from './middleware/loggerMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
    dotenv.config();
    await initDb();

    const app = express();

    app.use(express.json());


    app.use(requestLoggerMiddleware);

    app.get('/apartments',  expressAsyncHandler(listApartmentsHandler));
    app.get('/apartments/:id', expressAsyncHandler(getApartmentHandler));

    app.post('/register',  expressAsyncHandler(registerHandler));
    app.post('/login',  expressAsyncHandler(loginHandler));


    app.use(authMiddleware);
    app.post('/apartments',  expressAsyncHandler(createApartmentHandler));

    
    app.use(errorHandler);

    app.listen(3000);
})();