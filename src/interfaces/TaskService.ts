import { TaskDTO } from "../dtos/TaskDTO.js";

export interface TaskService {
    getAllTasks(): Promise<TaskDTO[]>;
    getTaskById(id: string): Promise<TaskDTO | null>;
    createTask(dto: TaskDTO): Promise<TaskDTO>;
    updateTask(id: string, updateData: TaskDTO): Promise<TaskDTO | null>;
    deleteTask(id: string): Promise<TaskDTO | null>;
}