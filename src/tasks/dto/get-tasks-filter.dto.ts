import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { STATUSES, TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(STATUSES)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
