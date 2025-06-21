import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouter } from './app/controllers/books.controller';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRouter);


app.get('/', (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'Welcome to the library management app!'
    });
});

export default app;