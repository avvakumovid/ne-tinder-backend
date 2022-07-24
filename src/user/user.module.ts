import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import  { User, UserSchema } from './user.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserGateway, UserService]
})
export class UserModule { }
