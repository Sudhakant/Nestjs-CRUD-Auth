import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService){}

    @Post()
    create(@Body() feedPost: FeedPost){
        return this.feedService.createPost(feedPost);
    }

    @Get()
    findAll(){
        return this.feedService.findAllPosts();
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: FeedPost,
    ){
        return this.feedService.updatePost(id, feedPost);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ){
        return this.feedService.deletePost(id);
    }
}
