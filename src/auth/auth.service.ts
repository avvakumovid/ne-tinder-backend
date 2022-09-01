import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }



    async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.userModel.findOne({ email: loginDto.email })
        if (user.password === loginDto.password) {
            return user;
        }
        return null;
    }

}
