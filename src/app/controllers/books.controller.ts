import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Error } from 'mongoose';
import { IBook, IBookQueryParams } from '../interfaces/book.interface';

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
    // console.log('Query Parameters:', req.query);

    // const { filter , sortBy, sort, limit = 10 } = req.query;
    // const filterObject = filter as keyof IBook["genre"] ? { genre: filter } : {};
    // const sortObject = sortBy && sort ? { [sortBy as keyof IBook]: sort as 'asc'|'desc' } : {};

    const { filter, sortBy, sort, limit }: IBookQueryParams = req.query

    try {
        const books = await Book.find(filter ? { genre: filter } : {}).sort(sortBy && sort ? { sortBy: sort } : {}).limit(Number(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error
        });
    }
});

bookRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookData = await Book.findById(req.params.bookId);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: bookData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book',
            error
        });
    }
});
bookRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error
        });
    }
});


bookRouter.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: updatedBook
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        }
        // updatedBook.set(req.body);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating book',
            error
        });
    }
});