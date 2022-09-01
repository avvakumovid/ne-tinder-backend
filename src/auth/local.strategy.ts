import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';


export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super()
    }

    async validate(loginDto: LoginDto): Promise<User> {
        const user = await this.authService.validateUser(loginDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user
    }
}