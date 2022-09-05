import { Controller, Get, Post, Request, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';



@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    private logger: Logger = new Logger('AuthController')

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async validateLogin(@Request() req) {
        this.logger.log('ss')
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfie(@Request() req) {
        return req.user;
    }
}