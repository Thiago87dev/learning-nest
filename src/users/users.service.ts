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
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return newUser;
  }

  async update(id: number, body: UpdateUserDto) {
    const updatedUser = await this.prisma.user
      .update({
        where: { id },
        data: body,
      })
      .catch(() => {
        throw new HttpException(
          'Esse usuário não existe',
          HttpStatus.NOT_FOUND,
        );
      });

    return updatedUser;
  }
}
