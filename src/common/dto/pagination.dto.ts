import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Max(50)
  @Min(0)
  @Type(() => Number)
  limit?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsIn(['name', 'description', 'createdAt'])
  orderBy?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc';
}
