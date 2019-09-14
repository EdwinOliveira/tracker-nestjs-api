import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {

    returnedMessage: { message: string, tasks: Task[] };

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    /* Get Methods
     * getTasks() -> Return all Tasks from MongoDB;
     * getTask() -> Return a single Task from MongoDB with the searched ID;
     */
    async getTasks(): Promise<{ message: string, tasks: Task[] }> {
        let getTasks;

        try {
            getTasks = await this.taskModel.find();
        } catch (error) {
            throw new NotFoundException(error);
        }
        if (!getTasks) {
            throw new NotFoundException('Requested Task does not exist on the current context!');
        } else {
            this.returnedMessage = {
                message: 'Request Tasks succefully loaded!',
                tasks: getTasks,
            };
        }

        return this.returnedMessage;
    }

    async getTask(id: string): Promise<{ message: string, tasks: Task[] }> {
        let getTask;

        try {
            getTask = await this.taskModel.findOne({ _id: id });
        } catch (error) {
            throw new NotFoundException('Requested method not valid!');
        }
        if (!getTask) {
            throw new NotFoundException('Requested Task does not exist on the current context!');
        } else {
            this.returnedMessage = {
                message: 'Request Task succefully loaded!',
                tasks: getTask,
            };
        }

        return this.returnedMessage;
    }
    /*--------------------------------------------------------------------*/

    /* Post Methods
     * postTask() -> Post a single Task to the MongoDB;
     */
    async postTask(task: Task): Promise<Task> {
        let newTask;
        try {
            newTask = new this.taskModel(task);
        } catch (error) {
            throw new NotFoundException(error);
        }
        return await newTask.save();
    }
    /*---------------------------------------------------------------------*/

    /* Update Methods
     * updateTask() -> Update a single Task from MongoDB with the searched ID;
     */
    async updateTask(id: string, task: Task): Promise<{ message: string, tasks: Task[] }> {
        let updateResult;
        try {
            updateResult = await this.taskModel.findByIdAndUpdate(id, task, { new: true });
        } catch (error) {
            throw new NotFoundException('Requested method or arguments invalid!');
        }
        if (!updateResult) {
            throw new NotFoundException('Requested Task does not exist on the current context!');
        } else {
            this.returnedMessage = {
                message: 'Requested Tasks succefully deleted!',
                tasks: updateResult,
            };
        }
        return this.returnedMessage;
    }
    /*---------------------------------------------------------------------*/

    /* Delete Methods
     * deleteTasks() -> Delete all Tasks from MongoDB;
     * deleteTask() -> Delete a single Task from MongoDB with the searched ID;
     */
    async deleteTasks(): Promise<string> {
        let removeResult;

        try {
            removeResult = await this.taskModel.deleteMany();
        } catch (error) {
            throw new NotFoundException('Requested method or arguments invalid!');
        }
        if (!removeResult) {
            throw new NotFoundException('Requested Tasks do not exist on the current context!');
        } else {
            this.returnedMessage = {
                message: 'Requested Tasks succefully deleted!',
                tasks: removeResult,
            };
        }
        return this.returnedMessage.message;
    }

    async deleteTask(id: string): Promise<string> {
        let removeResult;

        try {
            removeResult = await this.taskModel.findByIdAndRemove(id);
        } catch (error) {
            throw new NotFoundException('Requested method or arguments invalid!');
        }
        if (!removeResult) {
            throw new NotFoundException('Requested Task does not exist on the context!');
        } else {
            this.returnedMessage = {
                message: 'Requested Task succefully deleted!',
                tasks: removeResult,
            };
        }

        return this.returnedMessage.message;
    }
    /*---------------------------------------------------------------------*/
}
