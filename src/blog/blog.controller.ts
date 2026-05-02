import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  /**
   * Api to get all blogs
   */
  @Get('blogs')
  async getALLBlogs(@Query('page') page:number , @Query('limit') limit:number)
  {
    return this.blogService.getAllBlogs(page,limit);
  }

  
  @Post('createBlogs')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: BlogDto})
  async createBlog(@UploadedFile() image: Express.Multer.File ,@Body()dto:BlogDto) {
      return this.blogService.createBlog(image,dto);
  }

}
