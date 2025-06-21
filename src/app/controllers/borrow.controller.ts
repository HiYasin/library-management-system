import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
export const borrowRouter = express.Router();

borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const borrows = await Borrow.find();
        res.status(200).json({
            success: true,
            message: 'Borrow records retrieved successfully',
            data: borrows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving borrow records',
            error
        });
    }
});

borrowRouter.post('/', async (req: Request, res: Response) => {
    const borrowData = req.body;
    const { book, quantity, dueDate } = borrowData;
    try{
        // Validate book availability
        const bookRecord = await Book.findById(book);
        if (!bookRecord) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return;
        }
        if (!bookRecord.available || bookRecord.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available to borrow'
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

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error borrowing book',
            error
        });
    }
})