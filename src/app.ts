import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
import { unknownRouteHandler } from './app/middlewares/unknownRoute.handler';
import { globalErrorHandler } from './app/middlewares/error.middleware';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'Welcome to the library management app!'
    });
});

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

app.use(unknownRouteHandler);
app.use(globalErrorHandler);

export default app;