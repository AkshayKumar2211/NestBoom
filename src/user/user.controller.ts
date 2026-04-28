import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './UserDto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('register')
  async registerUser(@Body() dto :UserDto)
  {
       const registerUser=await this.userService.registerUser(dto);
       return registerUser;
  }
}
