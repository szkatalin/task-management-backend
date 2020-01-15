import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskRepository} from './task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {DeleteResult} from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //  return this.taskRepository;
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       task => task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //
  //   return tasks;
  // }

  async getTaskById(taskId: number): Promise<Task> {
    const resultTask = await this.taskRepository.findOne(taskId);
    if (!resultTask) {
      throw new NotFoundException('Task is not found');
    }
    return resultTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  //   this.tasks.push(newTask);
  //   // it is faster to append the new task (what backend gives back) to the list, and the frontend should not call /tasks to refresh the list
  //   return newTask;
  // }
  //
  async deleteTask(taskId: number): Promise<DeleteResult> {
    const result = await this.taskRepository.delete(taskId);
    return result;
  }
  //
  // updateTaskStatus(taskId: string, taskStatus: TaskStatus): Task {
  //   const taskIndex = this.tasks.findIndex(task => task.id === taskId);
  //   if ( taskIndex === -1) {
  //     throw new NotFoundException('Task is not found');
  //   }
  //   this.tasks[taskIndex].status = taskStatus;
  //   return this.tasks[taskIndex];
  // }
}
