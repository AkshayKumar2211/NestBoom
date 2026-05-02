import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
   @Prop({ type: String, required: true })
   title: string;

   @Prop({ type: String, required: true })
   content: string;

   @Prop({ type: String, required: true })
   category: string;

   @Prop({ type: [String], default: [] })
   tags: string[];

   @Prop({type:String})
   imageUrl:string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);


