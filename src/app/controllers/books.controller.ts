import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/book.model';
import { IBookQueryParams } from '../interfaces/book.interface';
export const bookRouter = express.Router();

bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const bookData = new Book(req.body);
    try {
        const savedBook = await bookData.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: savedBook
        });
    } catch (error) {
        next(error);
    }
})

bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { filter, sortBy, sort, limit=10 }: IBookQueryParams = req.query;

    if (filter && !['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'].includes(filter)) {
        throw new Error('Invalid genre filter provided');
    } else if (sortBy && !['title', 'author', 'genre', 'isbn', 'description', 'copies', 'available', 'createdAt', 'updatedAt'].includes(sortBy)) {
        throw new Error('Invalid sortBy field provided');
    }
    // console.log('Query Parameters:', req.query);
    try {
        const books = await Book.find(filter ? { genre: filter } : {}).sort(sortBy && sort ? { [sortBy]: sort } : {}).limit(Number(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
});

bookRouter.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookData = await Book.findById(req.params.bookId);
        if (!bookData) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: bookData
        });
    } catch (error) {
        next(error);
    }
});

bookRouter.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
});

bookRouter.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findById(req.params.bookId);

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: book
            });
        } else {
            book.set(req.body);
            const updatedBook = await book.save();
            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        }
    } catch (error) {
        next(error);
    }
});