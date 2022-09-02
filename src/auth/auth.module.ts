import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { UserSchema } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [UsersModule, PassportModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, UsersService, LocalStrategy]
})
export class AuthModule { }
