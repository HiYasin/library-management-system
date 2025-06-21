
import { IBorrow } from './../interfaces/borrow.interface';
import { model, Schema } from "mongoose";
export const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value: Date) {
                return value > new Date(); // Ensure dueDate is in the future
            },
            message: 'Due date must be in the future.'
        }
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Borrow = model('Borrow', borrowSchema);