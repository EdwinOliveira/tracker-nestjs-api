import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {

    returnMessage: string;

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    /* Get Methods
     * getTasks() -> Return all Tasks from MongoDB;
     * getTask() -> Return a single Task from MongoDB with the searched ID;
     */
    async getTasks(): Promise<Task[]> {
        return await this.taskModel.find();
    }

    async getTask(id: string): Promise<Task> {
        let task;
        try {
            task = await this.taskModel.findOne({ _id: id });
        } catch (error) {
            throw new NotFoundException('Request method not valid!');
        }
        if (!task) {
            throw new NotFoundException('Could not find task');
        }

        return task;

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
            throw new NotFoundException(error)
        }
        return await newTask.save();
    }
    /*---------------------------------------------------------------------*/

    /* Update Methods
     * updateTask() -> Update a single Task from MongoDB with the searched ID;
     */
    async updateTask(id: string, task: Task): Promise<Task> {
        return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
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
            throw new NotFoundException('Request method or arguments invalid!');
        } finally {
            if (!removeResult) {
                this.returnMessage = 'Requested Tasks do not exist on the context!';
            } else {
                this.returnMessage = 'Requested Tasks succefully deleted!';
            }
        }
        return this.returnMessage;
    }

    async deleteTask(id: string): Promise<string> {
        let removeResult;

        try {
            removeResult = await this.taskModel.findByIdAndRemove(id);
        } catch (error) {
            throw new NotFoundException('Request method or arguments invalid!');
        } finally {
            if (!removeResult) {
                this.returnMessage = 'Requested Task does not exist on the context!';
            } else {
                this.returnMessage = 'Requested Task succefully deleted!';
            }
        }
        return this.returnMessage;
    }
    /*---------------------------------------------------------------------*/
}
