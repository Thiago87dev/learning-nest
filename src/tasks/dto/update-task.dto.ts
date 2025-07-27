import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean({ message: 'Completed deve ser um Boolean' })
  @IsOptional()
  readonly completed?: boolean;
}
