import express, { RequestHandler } from 'express';
import { db } from './datastore';
import { createApartmentHandler, getApartmentHandler, listApartmentsHandler } from './handlers/apartmentHandler';

const app = express();

app.use(express.json());


const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
}

app.use(requestLoggerMiddleware);

app.get('/apartments',  listApartmentsHandler);

// show a specific apartment
app.get('/apartments/:id', getApartmentHandler);

// add a new apartment
app.post('/apartments',  createApartmentHandler);
// register user
app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user);

    res.send('User registered');
});

// login user

app.post('/login', (req, res) => {
    res.send('User logged in');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
