import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import {DeleteResult} from 'typeorm';
import {TaskStatus} from './task-status.enum';

@Controller('tasks') // which route should be handled
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

   @Get(':id')
   getTaskById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
     return this.tasksService.getTaskById(taskId);
   }
  //
   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
     return this.tasksService.createTask(createTaskDto);
   }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<DeleteResult> {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) taskId: number, @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(taskId, taskStatus);
  }
}
