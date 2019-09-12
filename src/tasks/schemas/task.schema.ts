import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        max: [12, 'Title lenght is at max 12 characters'],
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    finishDate: {
        type: String,
        required: [true, 'Finish Date is required!'],
    },
    complete: {
        type: Boolean,
        default: false,
    },
});
