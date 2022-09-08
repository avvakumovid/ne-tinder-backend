import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createChatDto: CreateChatDto) {
        const createChat = await new this.chatModel(createChatDto)
        return createChat.save()
    }


    async updateMessages(updateMessagesDto: UpdateMessagesDto) {
        const user = await this.userModel.findById(updateMessagesDto.message.author)
        const chat = await this.chatModel.findById(updateMessagesDto.chatId)
        chat.messages.push({ ...updateMessagesDto.message, author: user._id })
        await chat.save()
        return chat.messages
    }

}