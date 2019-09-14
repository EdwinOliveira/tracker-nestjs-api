export interface Task {
    id?: string;
    title: string;
    description: string;
    finishDate: string;
    complete: boolean;
}

export interface Message {
    message: string;
    task: Task;
}
