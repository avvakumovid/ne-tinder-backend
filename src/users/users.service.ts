import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = await new this.userModel(createUserDto)
    return await createUser.save()
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getUsers() {
    return await this.userModel.find();
  }

}
