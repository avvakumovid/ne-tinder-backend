import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/users/dto/login.dto';
import { User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(email: string) {
        return await this.userModel.findOne({ email });
    }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email: username })
        if (user.password === pass) {
            return user;
        }
        return null;
    }

}
