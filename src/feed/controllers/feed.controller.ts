import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Roles(Role.ADMIN, Role.PREMIUM, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async create(@Body() feedPost: FeedPost, @Request() req): Promise<any> {
    // console.log(req)
    return this.feedService.createPost(req.user, feedPost);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  async findAll(): Promise<any> {
    return this.feedService.findAllPosts();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Promise<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
