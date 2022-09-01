import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/ne-tinder?retryWrites=true&w=majority'),
    UsersModule,
    MulterModule.register({ dest: './uploads' })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


//mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/?retryWrites=true&w=majority