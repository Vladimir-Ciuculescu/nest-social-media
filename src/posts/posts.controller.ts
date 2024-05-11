import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { NestRequest } from 'src/types/nest-requests';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post('/add')
  @UseGuards(AuthGuard('jwt'))
  addPost(@Body() body: CreatePostDto, @Req() req: NestRequest) {
    const userId = req.user.userId;

    return this.postsService.addPost(body, userId);
  }
}
