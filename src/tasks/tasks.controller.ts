import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  // UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin.guard';
// import { TaskUtils } from './tasks.utils';
// import { ApiExceptionFilter } from 'src/common/exceptionFilters/excepitionFilter';

@Controller('tasks')
// @UseFilters(ApiExceptionFilter)
// @UseGuards(AuthAdminGuard)
export class TasksController {
  constructor(
    private readonly taskService: TasksService,
    // private readonly taskUtil: TaskUtils
    @Inject('KEY_TOKEN')
    private readonly keyToken: string
  ) {}
  @Get('/teste')
  getTest() {
    return 'Teste de tarefa';
  }

  @Get()
  @UseInterceptors(LoggerInterceptor)
  @UseInterceptors(AddHeaderInterceptor)
  findAllTasks(@Query() params: PaginationDto) {
    // console.log(this.taskUtil.splitString("Thiago Gomes da Silva Alves"));
    return this.taskService.findAll(params);
  }

  @Get(':id')
  @UseGuards(AuthAdminGuard)
  findOneTask(@Param('id', ParseIntPipe) id: number) {
    
    console.log(this.keyToken);
    
    return this.taskService.findOne(id);
  }

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
  createOneTask(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
