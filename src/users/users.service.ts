import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const [findAllUser, count] = await Promise.all([
      this.prisma.user.findMany(),
      this.prisma.user.count(),
    ]);
    return { findAllUser, count };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          // password: false,
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, body: UpdateUserDto) {
    const updatedUser = await this.prisma.user
      .update({
        where: { id },
        data: body,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Esse usuário não existe',
          HttpStatus.NOT_FOUND,
        );
      });

    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser = await this.prisma.user
      .delete({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      .catch(() => {
        throw new HttpException('Esse usuário não exite', HttpStatus.NOT_FOUND);
      });
    return { message: `Usuário ${deletedUser.name} deletado(a) com sucesso` };
  }
}
