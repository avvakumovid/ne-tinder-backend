import { Get, Injectable, Request, UseGuards, forwardRef, Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/users/dto/login.dto';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';




@Injectable()
export class AuthService {
    private logger: Logger = new Logger('AuthService')
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findOne(email)
        if (user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user._id.toString() }
        const token = {
            access_token: this.jwtService.sign(payload)
        }
        return token
    }




}
