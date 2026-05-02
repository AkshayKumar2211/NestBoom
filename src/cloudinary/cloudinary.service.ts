import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary'
import { Console } from 'console';

@Injectable()
export class CloudinaryService {
    constructor(){
        cloudinary.config({
            cloud_name:   process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    async uploadImage(image:any,title:string):Promise<any>
    {

      
         const imageAsBase64 = image.buffer.toString('base64');
         const dataURI = `data:text/plain;base64,${imageAsBase64}`;


        const imageData= await cloudinary.uploader
            .upload(dataURI, {
            resource_type: "image", 
            public_id: `blog${title}`,
            overwrite: true, 
            })

        const imageUrl=imageData.secure_url;
        return imageUrl;
    }

}
