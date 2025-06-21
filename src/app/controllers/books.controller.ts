import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Error } from 'mongoose';

export const bookRouter = express.Router();

bookRouter.post('/', async (req: Request, res: Response) => {
    const bookData = new Book(req.body);
    try {
        const savedBook = await bookData.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: savedBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating book',
            error
        });
    }
})

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error
        });
    }
});