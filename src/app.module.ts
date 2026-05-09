import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListModule } from './todo-list/todo-list.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessangerModule } from './messanger/messanger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URL') ??
          'mongodb://mongodb:27017/nestjs',
      }),
    }),
    TodoListModule,
    AuthModule,
    UserModule,
    BlogModule,
    CloudinaryModule,
    MessangerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
