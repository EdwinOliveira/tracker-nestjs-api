import { TaskDto } from './dto/task.dto';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Get()
    getTasks(): string {
        return 'Get all Tasks';
    }

    @Get(':id')
    getTask(@Param('id') id): string {
        return `Get Task with id: ${id}`;
    }

    @Post()
    postTask(@Body() createTaskDto: TaskDto): string {
        return `Title: ${createTaskDto.title}`;
    }

    @Put()
    updateTasks(@Body() taskDto: TaskDto): string {
        return 'Update all Tasks';
    }

    @Put()
    updateTask(@Body() updateTaskDto: TaskDto, @Param('id') id): string {
        return `Update Task with title: ${updateTaskDto.title}`;
    }

    @Delete()
    deleteTasks(): string {
        return 'Delete all tasks';
    }

    @Delete()
    deleteTask(@Param('id') id): string {
        return `Delet Task with id: ${id}`;
    }
}
