import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add')
  //   @UseInterceptors(new SerializeInterceptor(UserDto))
  addUser(@Body() body: CreateUserDto) {
    return this.usersService.addUser(body);
  }

  @Get('')
  //   @UseInterceptors(new SerializeInterceptor(UserDto))
  getUsers() {
    return this.usersService.getUsers();
  }
}
