import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, UseInterceptors, UploadedFile, Res, UploadedFiles, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { comparePassword, encodingPassword } from 'src/utils/bcrypt';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { parse } from 'path'
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './../auth/local-auth.guard';

enum Status {
  error = 'error',
  ok = 'ok'
}

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  private logger: Logger = new Logger('AuthController')


  @Post('/registration')
  @UseInterceptors(FilesInterceptor('files', 9, {
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
  async registration(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createUserDto: CreateUserDto) {

    try {

      const candidate = await this.usersService.findOne(createUserDto.email)
      if (candidate) {
        return {
          status: Status.error, msg: `Пользователь c такой почтой уже зарегистрирован`
        }
      }
      const password = encodingPassword(createUserDto.password)
      const user = await this.usersService.create({ ...createUserDto, password, pictures: files.map(f => f.filename) });
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

      console.log(loginDto)
      const user = await this.usersService.findOne(loginDto.email)
      if (!user) {
        return {
          status: Status.error, msg: `Неверная почта или пароль 1`
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
        status: Status.error, msg: `Неверная почта или пароль 2`
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

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 9, {
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
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log(files)
    return files
  }

  @Get('file/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(`C:/dev/ne-tinder/ne-tinder-backend/files/${filename}`)
  }


  @UseGuards(LocalAuthGuard)
  @Post('/validateLogin')
  async validateLogin(@Request() req) {
    console.log(req)
    return req.user
  }
}
