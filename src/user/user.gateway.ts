import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

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
    this.server.emit('message', payload)
    return payload
  }

  @SubscribeMessage('createUser')
  create(@MessageBody() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SubscribeMessage('findAllUser')
  findAll() {
    return 'asd'
    return this.userService.findAll();
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.userService.findOne(id);
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
