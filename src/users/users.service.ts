import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addUser(body: CreateUserDto) {
    const { email, username, password } = body;

    const existentUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existentUser) {
      throw new HttpException(
        { error: 'This email address is already in user' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prismaService.user.create({
      data: { email, username, password: hashedPassword },
    });

    return user;
  }

  async findUser(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany();

    return users;
  }
}
