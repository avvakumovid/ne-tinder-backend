import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { comparePassword, encodingPassword } from 'src/utils/bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { parse } from 'path'

enum Status {
  error = 'error',
  ok = 'ok'
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
  private logger: Logger = new Logger('AuthController')
  @Post('/registration')
  async registration(@Body() createUserDto: CreateUserDto) {

    try {

      const candidate = await this.userService.findOne(createUserDto.email)
      if (candidate) {
        return {
          status: Status.error, msg: `Пользователь c такой почтой уже зарегистрирован`
        }
      }
      const password = encodingPassword(createUserDto.password)
      const user = await this.userService.create({ ...createUserDto, password });
      return {
        status: Status.ok, msg: `Пользователь создан`, user: user
      }
    } catch (e) {
      return {
        status: Status.error, msg: e.message
      }
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {

    try {

      const user = await this.userService.findOne(loginDto.email)
      if (!user) {
        return {
          status: Status.error, msg: `Неверная почта или пароль`
        }
      }
      const matched = comparePassword(loginDto.password, user.password)
      user.password = null
      if (matched) {
        return {
          status: Status.ok, msg: `Авторизация прошла успешно`, user
        }
      }

      return {
        status: Status.error, msg: `Неверная почта или пароль`
      }
    } catch (e) {
      return {
        status: Status.error, msg: e.message
      }
    }
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqeSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9)
        const { name, ext } = parse(file.originalname)
        // const name = basename(file.originalname)
        // const ext = extname(file.originalname)
        const fileName = `${name}_${uniqeSuffix}${ext}`
        callback(null, fileName)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {

    console.log(file)
    return file
  }


  @Get('file/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(`C:/dev/ne-tinder/ne-tinder-backend/files/${filename}`)
  }
}
