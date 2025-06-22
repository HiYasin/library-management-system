import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookInstanceMethods>({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies cannot be negative']
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
})


bookSchema.methods.borrowBooks = function (borrowQuantity: number): void {
    if (this.available && this.copies >= borrowQuantity) {
        this.copies -= borrowQuantity;
        if (this.copies === 0) {
            this.available = false;
        }
    }
};

export const Book = model("Book", bookSchema);