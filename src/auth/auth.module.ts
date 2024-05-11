import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategey } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '30d' } }),
  ],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    LocalStrategey,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
