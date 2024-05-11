import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
