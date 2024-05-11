import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(email);

    if (!user) {
      throw new HttpException(
        { error: 'This user does not exist' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatchPassword = await bcrypt.compare(pass, user.password);

    if (!isMatchPassword) {
      throw new HttpException(
        { error: 'This user does not exist' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
