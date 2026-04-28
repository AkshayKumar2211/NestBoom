import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Task.name,schema:TaskSchema}])],

  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
