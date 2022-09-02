import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/users/dto/login.dto';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private userService: UsersService,) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findOne(email)
        if (user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id }
        return {
            // access_token: this.
        }
    }

}
