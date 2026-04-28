import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),JwtModule.register({
      global: true,
      secret: "Abjdsbsckjnkjdsnckndsklnasklnklasncksdnkacsnkcn",
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
