import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
 
    getAllTasks(): Task[ ] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        // do something with status
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }

        // do something with search
        if(search){
            tasks = tasks.filter(task => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto):Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    updaeTask(id:string, updateTaskDto:UpdateTaskDto):Task{
        this.tasks = this.tasks.map(task => {
            if(task.id === id){
                return {id, ...updateTaskDto};
            }

            return task
        });

        return this.tasks.find(task => task.id === id);
    }

    updateTaskStatus(id: string, status: TaskStatus){
        this.tasks = this.tasks.map(task => {
            if(task.id === id){
                return {...task, status}
            }
            return task
        });
    
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id:string): Task {
        const task: Task = this.tasks.find(task => task.id === id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        return task;
    }
}
