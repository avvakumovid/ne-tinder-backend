
import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';






@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private jwtService: JwtService) { }
    @WebSocketServer()
    server: Server

    private logger: Logger = new Logger('ChatGateway')

    afterInit(server: any) {
        this.logger.log('Init')
    }
    @UseGuards(JwtAuthGuard)
    handleConnection(client: any, ...args: any[]) {


        const payload = this.jwtService.decode(client.handshake.headers.authorization?.split(' ')[1])

        if (!payload) {
            this.server.disconnectSockets()
        } else {
            console.log(payload)
            if (typeof payload === 'object') {
                this.logger.log(`Client connected: ${client.id}`)
                this.logger.log(`User connected: ${payload.email}`)
            }

        }

    }
    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }


    @SubscribeMessage('message')
    message(client: Socket, payload: string) {
        this.logger.log(payload)
        this.server.emit('message', payload)
        // return payload
    }


    chekAuth = (client: any) => {

        const payload = this.jwtService.decode(client.handshake.headers.authorization.split(' ')[1])

        if (!payload) {
            this.server.disconnectSockets()
        } else {
            console.log(payload)
            if (typeof payload === 'object') {
                this.logger.log(`Client connected: ${client.id}`)
                this.logger.log(`User connected: ${payload.email}`)
            }

        }
    }
}