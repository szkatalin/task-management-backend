import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskRepository} from './task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {DeleteResult} from 'typeorm';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {User} from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(taskId: number): Promise<Task> {
    const resultTask = await this.taskRepository.findOne(taskId);
    if (!resultTask) {
      throw new NotFoundException('Task is not found');
    }
    return resultTask;
  }

  async createTask(
      createTaskDto: CreateTaskDto,
      user: User,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(taskId: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(taskId);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return await task.save();
  }
}
