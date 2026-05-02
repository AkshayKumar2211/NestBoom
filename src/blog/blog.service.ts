import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { Blog } from './schema/blog.schema';
import { MAX } from 'class-validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogService {

constructor(@InjectModel(Blog.name) private readonly blogModel:Model<Blog>,
private readonly clodinary:CloudinaryService){}
   

    /**
     * 
     * @param  page , limit for pagination and limit.. 
     * @returns 
     */
    async getAllBlogs(page:number,limit:number)
    {

        page=Math.max(1,Number(page) || 1);
        limit=Math.max(1,Number(limit)||1);

        const skip=(page-1) * limit;
        
        const [blogs,total]=await Promise.all([
            this.blogModel.find({}).sort({createdAt:-1}).skip(skip).limit(limit).lean(),
            this.blogModel.countDocuments()
        ]) 

        const totalPages=Math.ceil(total / limit);


         return {
        data: blogs,
        meta: {
            total,
            page,
            limit,
            totalPages,
            },
        };
    }

    /**
     * Create a blog function
     * @param image and blog dto
     * @return craeted blog
     */
    async createBlog(image:Express.Multer.File,dto:BlogDto)
    {
        
        const imageUrl=await this.clodinary.uploadImage(image,'test');
        
        if(!imageUrl)
        {
            throw new BadRequestException('Unable to upload the images..');
        }

        const blogData=await this.blogModel.create({...dto,imageUrl});

        if(!blogData)
        {
            throw new BadRequestException("Unable to create the blog...");
        }


        return {
            message:"Blog created successfully",
            data:blogData
        }

    }







    /**
     * @param id 
     * To delete a blog..
     */
    async deleteBlog(id:string):Promise<Boolean>
    {
        if(!id || !Types.ObjectId.isValid(id))
        {
            throw new BadRequestException('Id is required for deletion of a blog...');
        }
        
        const isDeleted=await this.blogModel.findByIdAndDelete(id);

        if(!isDeleted)
        {
            throw new NotFoundException('Unable to delete an blog');
        }
        
        return true;
    }


}
