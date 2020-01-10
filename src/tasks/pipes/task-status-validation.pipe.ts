import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(taskStatus: any): boolean {
    const allowedStatuses = Object.keys(TaskStatus).map(key => TaskStatus[key]);
    return allowedStatuses.indexOf(taskStatus) !== -1;
  }
}
