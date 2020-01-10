import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task, TaskStatus} from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';

@Controller('tasks') // which route should be handled
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string): Task {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') taskId: string, @Body('status') taskStatus: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(taskId, taskStatus);
  }
}
