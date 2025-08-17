import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TaskUtils } from './tasks.utils';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private taskUtil: TaskUtils
  ) {}

  async findAll(params?: PaginationDto) {
    console.log(this.taskUtil.splitString("Thiago Alves"));
    const {
      limit = 10,
      offset = 0,
      orderBy = 'name',
      order = 'asc',
    } = params ?? {};

    const [findAllTasks, count] = await Promise.all([
      this.prisma.task.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          [orderBy]: order,
        },
      }),
      this.prisma.task.count(),
    ]);
    
    return { findAllTasks, count };
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id },
    });
    if (!task) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      // throw new NotFoundException('Essa tarefa não existe');
    }
    return task;
  }

  async create(body: CreateTaskDto) {
    const newTask = await this.prisma.task
      .create({
        data: {
          name: body.name,
          description: body.description,
          completed: false,
          userId: body.userId,
        },
      })
      .catch(() => {
        throw new HttpException('Erro ao criar tarefa', HttpStatus.BAD_REQUEST);
      });
    return newTask;
  }

  async update(id: number, body: UpdateTaskDto) {
    const allowedFields: (keyof UpdateTaskDto)[] = [
      'name',
      'description',
      'completed',
    ];
    const data: Record<string, any> = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        data[key] = body[key];
      }
    }
    const updatedTask = await this.prisma.task
      .update({
        where: { id },
        data,
      })
      .catch(() => {
        throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      });
    return updatedTask;
  }

  async delete(id: number) {
    const deletedTask = await this.prisma.task
      .delete({
        where: { id },
      })
      .catch(() => {
        throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      });
    return `tarefa ${deletedTask.name} apagada com sucesso`;
  }
}
