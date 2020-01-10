import { BadRequestException, PipeTransform } from '@nestjs/common';
import { STATUSES } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any): any {
    value = value.toUpperCase();
    if (!TaskStatusValidationPipe.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private static isStatusValid(taskStatus: any): boolean {
    return STATUSES.indexOf(taskStatus) !== -1;
  }
}
