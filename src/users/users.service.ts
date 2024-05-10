import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addUser(body: CreateUserDto) {
    const { email, username } = body;

    const existentUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existentUser) {
      throw new HttpException(
        { error: 'This email address is already in user' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const user = await this.prismaService.user.create({
      data: { email, username },
    });

    return user;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany();

    return users;
  }
}
