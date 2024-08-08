import Task, { TaskDocument } from '../models/Task.js';
import { TaskService } from "../interfaces/TaskService.js";
import { toDTO, fromDTO } from '../converters/TaskConverter.js';
import { TaskDTO } from '../dtos/TaskDTO.js';
import TaskModel from '../models/Task.js';

export class TaskServiceImpl implements TaskService {
    /**
      * Get a task by its ID.
      * @param id - The ID of the task.
      * @returns The task document or null if not found.
      */
    async getTaskById(id: string): Promise<TaskDTO | null> {
        const task = await Task.findById(id);
        if (!task) return null;
        const dto = toDTO(task);
        return dto;
    }

    /**
    * Get all tasks.
    * @returns A promise that resolves to an array of all task documents.
    */
    async getAllTasks(): Promise<TaskDTO[]> {
        try {
            const tasks = await Task.find().exec();
            return tasks.map(toDTO);
        } catch (error) {
            console.error('Error fetching all tasks', error);
            throw new Error('Error fetching tasks');
        }
    }


    /**
     * Create a new task.
     * @param taskData - The data to create a new task.
     * @returns The created task document.
     */
    async createTask(dto: TaskDTO): Promise<TaskDTO> {

        try {
            const taskData = fromDTO(dto);
            const task = new TaskModel(taskData);
            const savedTask = await task.save();
            const returnDTO = toDTO(savedTask as TaskDocument);
            return returnDTO;
        } catch (error) {
            console.error('Error creating task', error);
            throw new Error('Error creating task');
        }
    }

    /**
     * Update an existing task.
     * @param id - The ID of the task to update.
     * @param updateData - The data to update the task with.
     * @returns The updated task document.
     */
    async updateTask(id: string, updateData: TaskDTO): Promise<TaskDTO | null> {
        try {
            // Convert the DTO to a partial TaskDocument
            const taskData = fromDTO(updateData as TaskDTO);
            // Update the main Task document
            const updatedTask = await TaskModel.findByIdAndUpdate(id, taskData, { new: true }).exec();
            if (!updatedTask) return null;
            // Convert the updated task  back to DTO
            const updatedDTO: TaskDTO = toDTO(updatedTask);
            return updatedDTO;
        } catch (error) {
            console.error(`Error updating task by ID: ${id}`, error);
            throw new Error('Error updating task');
        }
    }

    /**
     * Delete a task by its ID.
     * @param id - The ID of the task to delete.
     * @returns The deleted task document.
     */
    async deleteTask(id: string): Promise<TaskDTO | null> {
        try {
            const deletedTask = await TaskModel.findByIdAndDelete(id).exec();
            if (!deletedTask) {
                return null;
            }
            return toDTO(deletedTask);
        } catch (error) {
            console.error(`Error deleting task by ID: ${id}`, error);
            throw new Error('Error deleting task');
        }
    }


}