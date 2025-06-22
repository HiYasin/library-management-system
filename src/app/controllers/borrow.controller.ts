import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
export const borrowRouter = express.Router();

borrowRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const borrows = await Borrow.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { 
                $project: {
                    _id: 0,
                    book: { title: 1, isbn: 1 },
                    totalQuantity: 1 
                }
            },
            { $unwind: '$book' }

        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrows
        });
    } catch (error) {
        next(error);
    }
});

borrowRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const borrowData = req.body;
    const { book, quantity } = borrowData;
    try {
        const bookRecord = await Book.findById(book);
        if (!bookRecord) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
            return;
        }

        if (!bookRecord.available || bookRecord.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available to borrow',
                data: null
            });
            return;
        }

        bookRecord.borrowBooks(quantity);
        await bookRecord.save();

        const result = await Borrow.create(borrowData);

        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: result
        });

    } catch (error) {
        next(error);
    }
});

