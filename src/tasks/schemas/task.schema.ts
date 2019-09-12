import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    finishDate: String,
    complete: Boolean,
});