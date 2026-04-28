import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoListService {

    constructor(@InjectModel(Task.name) private taskModel:Model<Task>){}


    async createTask(data:any):Promise<string>
    {
        if(!data.task || !data.assignBy || !data.assignTime)
        {
           throw new BadRequestException('Something bad is happen');
        }


        const createTask= await this.taskModel.create(data);

        if(!createTask)
        {
            throw new InternalServerErrorException("Unable to create a task");
        }

        return "Task created successfully";
    }


    async getAllTask():Promise<any>
    {
        const tasks=await this.taskModel.find();

        if(!tasks)
        {
            throw new InternalServerErrorException("Unable to fetch data from the database");
        }


        return tasks;

    }


    async getById(id:String):Promise<any>
    {
        if(!id){
            throw new BadRequestException("Id is required please provide a id");
        }

        const task=await this.taskModel.findById(id);

        if(!task)
        {
            throw new BadRequestException("Task with this id is not exist in the database");
        }
    }

    // complete this update function tommorow
    async update(data:any):Promise<any>
    {
        const {task,assignBy,assignTime}=data;

    
    }


    async deleteById(id:String):Promise<Boolean>
    {
        if(!id)
        {
            throw new BadRequestException("Id is required for the deletion");
        }

        const deleted=await this.taskModel.findByIdAndDelete(id);

        if(!deleted)
        {
            throw new BadRequestException('Deletion is failed');
        }

        return true;

    }

    
}
