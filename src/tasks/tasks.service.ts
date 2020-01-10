import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter( task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter( task => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(taskId: string): Task {
    // TODO: error handling
    return this.tasks.find(task => task.id === taskId);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    // it is faster to append the new task (what backend gives back) to the list, and the frontend should not call /tasks to refresh the list
    return newTask;
  }

  deleteTask(taskId: string): Task {
    const taskToDelete = this.getTaskById(taskId);
    const taskIndex = this.tasks.findIndex(task => taskId === task.id);
    this.tasks.splice(taskIndex, 1);
    return taskToDelete;
  }

  updateTaskStatus(taskId: string, taskStatus: TaskStatus): Task {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      // TODO: status validation
      this.tasks[taskIndex].status = taskStatus;
      return this.tasks[taskIndex];
  }
}
