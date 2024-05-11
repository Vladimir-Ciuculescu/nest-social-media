import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addPost(body: CreatePostDto, userId: number) {
    const { title, content } = body;

    const post = await this.prismaService.post.create({
      data: { title, content, user_id: userId },
    });

    return post;
  }

  async getPosts() {
    const posts = await this.prismaService.post.findMany();

    return posts;
  }

  async getPostById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      throw new HttpException(
        { error: 'Post not found !' },
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }
}
