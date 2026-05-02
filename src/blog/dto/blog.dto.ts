import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class BlogDto
{   
    @ApiProperty({type:'string',description:'Enter the title',default:'Developer'})
    @IsString()
    title:string

    @ApiProperty({type:'string',description:'Enter the content'})
    @IsString()   
    content: string;
    
    @ApiProperty({type:'string',description:'Enter the category'})
    @IsString()
    category: string;
    
    @ApiProperty({type:'array',description:'Enter the tags'})
    @IsArray()
    tags: string[];

    @ApiProperty({ type: 'string', format: 'binary' ,description:'Enter the image for blog' })
    image: any;
    
}

