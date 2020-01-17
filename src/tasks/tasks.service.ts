import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskRepository} from './task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {User} from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(taskId: number, user: User): Promise<Task> {
    const resultTask = await this.taskRepository.findOne({where: {id: taskId, userId: user.id}});
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

  async deleteTask(taskId: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({id: taskId, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return await task.save();
  }
}
