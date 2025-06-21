import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRouter = express.Router();

bookRouter.post('/',  async (req: Request, res: Response)=>{
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
            message: error?.message || 'Error creating book',
            error
        });
    }
})