import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { UserService } from './user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';


enum Status {
  error = 'error',
  success = 'success'
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UserService) { }

  @WebSocketServer()
  server: Server

  private logger: Logger = new Logger('UserGateway')

  afterInit(server: any) {
    this.logger.log('Init');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected : ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }


  @SubscribeMessage('msgToServer')
  handelMessage(client: Socket, payload: string): any {
    this.logger.log('msgToServer')
    this.server.emit('message', payload)
    return payload
  }

  @SubscribeMessage('createUser')
  async create(@MessageBody() createUserDto: CreateUserDto, @ConnectedSocket() client: Socket) {
    // this.server.emit('message', createUserDto)
    // client.emit('createUser', createUserDto)

    const candidate = await this.userService.findOne(createUserDto.email)
    if (candidate) {
      client.emit('createUser', { status: Status.error, msg: `Пользователь ${createUserDto.email} уже существует`, user: null })
      return
    }
    const user = await this.userService.create(createUserDto);
    client.emit('createUser', {
      status: Status.success, msg: `Пользователь создан`, user: user
    })
    return user
    // return this.userService.create(createUserDto);
  }

  @SubscribeMessage('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() username: string) {
    return this.userService.findOne(username);
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() id: number) {
    return this.userService.remove(id);
  }
}
