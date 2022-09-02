import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import { UsersService } from 'src/users/users.service';



enum Status {
    error = 'error',
    ok = 'ok'
}
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService, private userService: UsersService) {
        super(
            {
                usernameField: 'email',
                passwordField: 'password',
            }
        )
    }

    async validate(username: string, password: string) {
        try {

            const user = await this.userService.findOne(username);
            if (!user) {
                throw new UnauthorizedException();
            }
            const matched = comparePassword(password, user.password)
            user.password = null
            if (matched) {
                return user
            }

            throw new UnauthorizedException();
        } catch (e) {
            throw new UnauthorizedException();
        }

    }
}