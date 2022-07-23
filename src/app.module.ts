import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/?retryWrites=true&w=majority/ne-tinder'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


//mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/?retryWrites=true&w=majority