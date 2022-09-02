import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { User } from './entities/user.entity';
import mongooseAutoPopulate from 'mongoose-autopopulate';


@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // schema.plugin(require('mongoose-autopopulate'))
      // schema.plugin(mongooseAutoPopulate)
      return schema
    }
  }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
