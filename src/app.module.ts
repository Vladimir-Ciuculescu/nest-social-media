import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { PassportStrategy } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    JwtModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, PrismaService],
})
export class AppModule {}
