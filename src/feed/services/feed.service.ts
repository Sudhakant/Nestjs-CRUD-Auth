import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { FeedPostEnity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEnity)
    private readonly feedPostRepository: Repository<FeedPostEnity>,
  ) {}

  async createPost(user: User, feedPost: FeedPost): Promise<any> {
    // console.log(user);
    feedPost.author = user;
    return this.feedPostRepository.save(feedPost);
  }

  async findAllPosts(): Promise<any> {
    return this.feedPostRepository.find();
  }

  async updatePost(id: number, feedPost: FeedPost): Promise<UpdateResult> {
    return this.feedPostRepository.update(id, feedPost);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return this.feedPostRepository.delete(id);
  }
}
