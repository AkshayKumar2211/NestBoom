import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './UserDto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly model:Model<User>){}

    /**
     * Function to register user 
     * @Params UserDto
     * return user data..
     */

    async registerUser(dto:UserDto)
    {
      const {email,password}=dto;

      if(!email || !password)
      {
        throw new BadRequestException("You fucking peace of shit enter your email and password...");
      }

      const existUser=await this.checkExistUser(email);

      if(existUser)
      {
         throw new BadRequestException("User with this email already exist...")
      }

      const hashPass=(await this.hashPassword(password)).toString();

      const user=await this.model.create({
        email:email,
        password:hashPass
      });

      if(!user)
      {
        throw new InternalServerErrorException("Failed to create user");
      }

      return user;

    }

    /**
     * function to check if user with this email exist or not...
     * @param userEmail 
     * @returns boolean
     * true if user exist else false
     */
    async checkExistUser(userEmail:string):Promise<boolean>{
      
     if(!userEmail)
        {
            throw new BadRequestException("Please provide a email you shit head for verifications....");
        }  

        const user=await this.model.findOne({email:userEmail});

        if(!user)
        {
            return false;
        }
    
        return true;
    }


    /**
     * function to hashpassword..
     * @params password string
     * @return hashed password
     */

    async hashPassword(password:string):Promise<string>
    {
        if(!password)
        {
            throw new BadRequestException("Password is required for hassing....");
        }


        const salt=await bcrypt.genSaltSync(10)

        const hashPassword=await bcrypt.hashSync(password,salt);

        return hashPassword;
    }
}
