import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { time } from 'console';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;


@Schema({timestamps:true})
export class Task
{
   @Prop({ type:String,required:true})
   task:string;

   @Prop({type:String,required:true})
    assignBy:string

    @Prop({type:String})
    assignTime:string;
}


export const TaskSchema=SchemaFactory.createForClass(Task);



