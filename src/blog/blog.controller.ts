import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto, UpdateBlogDto } from './dto/blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  /**
   * Api to get all blogs
   */
  @Get()
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


  @Patch('/updateBlog/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:UpdateBlogDto})
  async updateBlog(@UploadedFile() image:Express.Multer.File ,@Body() dto :UpdateBlogDto,@Query(':id') id :string )
  {
      return this.blogService.updateblog(image,dto,id)
  }


  @Get(':id')
  async blog(@Param(':id') id : string)
  {
      return this.blogService.blog(id);
  }



  @Delete(':id')
  async deleteBlog(@Query ('id') id:string)
  {
    return this.blogService.deleteBlog(id);
  }



}
