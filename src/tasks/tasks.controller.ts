import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTask(@Param('id') id): Promise<Task> {
        return this.tasksService.getTask(id);
    }

    @Post()
    postTask(@Body() createTaskDto: TaskDto): Promise<Task> {
        return this.tasksService.postTask(createTaskDto);
    }

    @Put()
    updateTask(@Body() updateTaskDto: TaskDto, @Param('id') id): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Delete()
    deleteTasks(): Promise<Task[]> {
        return this.tasksService.deleteTasks();
    }

    @Delete()
    deleteTask(@Param('id') id): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }
}