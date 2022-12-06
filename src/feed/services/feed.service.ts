import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeedPostEnity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEnity)
    private readonly feedPostRepository: Repository<FeedPostEnity>,
  ) {}

  createPost(feedPost: FeedPost) {
    return this.feedPostRepository.save(feedPost);
  }

  findAllPosts(){
    return this.feedPostRepository.find();
  }

  updatePost(id: number, feedPost: FeedPost){
    return this.feedPostRepository.update(id, feedPost);
  }

  deletePost(id: number){
    return this.feedPostRepository.delete(id);
  }
}
