import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BlogDto, UpdateBlogDto } from './dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { Blog } from './schema/blog.schema';
import { MAX } from 'class-validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogService {

constructor(@InjectModel(Blog.name) private readonly blogModel:Model<Blog>,
private readonly cloudinary:CloudinaryService){}
   

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
        
        const imageUrl=await this.cloudinary.uploadImage(image,'test');
        
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
     * 
     * @param image 
     * @param dto 
     * @param id 
     * This is a test function correct this function after finding the issue
     */
    async updateblog(image:Express.Multer.File,dto:UpdateBlogDto,id)
    {
        let imageUrl;
        if(image)
        {
            imageUrl=await this.cloudinary.uploadImage(image,'updateTest');

        }
        else
        {
            const blog=await this.blogModel.findById(id);
            imageUrl=blog?.imageUrl;
        }

        const {title,content,category,tags}=dto;
        const updateBlog=await this.blogModel.findByIdAndUpdate(id,{title,content,category,tags,imageUrl});

        return updateBlog;

        
    }

    
    /**
     * @param id 
     * To get a blog data ..
     * @returns blog data
     */    

    async blog(id:string)
    {
        if(!id)
        {
            throw new BadRequestException('Id is rerquired...');
        }

        const blog=await this.blogModel.findById(id);

        if(!blog)
        {
            throw new BadRequestException('Blog with this id does not exist ');
        }

        return blog;
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
