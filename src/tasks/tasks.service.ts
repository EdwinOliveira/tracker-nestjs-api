import { Task } from './interfaces/task.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private readonly tasks: Task[] = [
        {
            id: '213132132',
            title: 'Clean House',
            description: 'Clean the House',
            finishDate: '31/09/2019',
            complete: false,
        },
        {
            id: '263132432',
            title: 'Clean Room',
            description: 'Clean the Room',
            finishDate: '31/09/2019',
            complete: false,
        },
    ];
}
