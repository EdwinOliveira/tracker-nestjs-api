import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Get()
    getTasks(): string {
        return 'Get all Tasks';
    }

    @Get()
    getTask(): string {
        return 'Get single Task';
    }

    @Post()
    postTask(): string {
        return 'Post single Task';
    }

    @Put()
    updateTasks(): string {
        return 'Update all Tasks';
    }

    @Put()
    updateTask(): string {
        return 'Update single Task';
    }

    @Delete()
    deleteTasks(): string {
        return 'Delete all tasks';
    }

    @Delete()
    deleteTask(): string {
        return 'Delete single task';
    }
}
