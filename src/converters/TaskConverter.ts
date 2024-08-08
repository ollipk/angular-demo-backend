import mongoose from 'mongoose';
import { TaskDTO } from '../dtos/TaskDTO.js';
import { TaskDocument } from '../models/Task.js';


export function toDTO(task: TaskDocument): TaskDTO {
    const dto: TaskDTO = {
        id: (task._id as mongoose.Types.ObjectId).toString(),
        day: task.day,
        text: task.text,
        reminder: task.reminder,
    };
    return dto;
}

export function fromDTO(dto: TaskDTO): Partial<TaskDocument> {
    const taskData: Partial<TaskDocument> = {
        _id: new mongoose.Types.ObjectId(dto.id),
        day: dto.day,
        text: dto.text,
        reminder: dto.reminder
    };
    return taskData;
}