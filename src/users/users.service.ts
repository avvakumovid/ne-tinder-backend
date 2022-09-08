import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Chat, ChatDocument } from 'src/chat/chat.schema';
import { FindeUserDto } from './dto/find-user.dto';




@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = await new this.userModel(createUserDto)
    return await createUser.save()
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.userModel.findById(id)
  }


  async getUsers(options: FindeUserDto) {
    return await this.userModel.find({
      age: { $gte: options.minAge ?? 0, $lte: options.maxAge ?? 999 },
      gender: options.gender ?? { $regex: '' },
      _id: { $nin: [options.userId, ...options.matches ?? []] }
    })
      .populate('myLikes', '_id age gender pictures name location')
      .populate('meLikes', '_id age gender pictures name location')
      .populate('matches.user', '_id age gender pictures name location')
  }

  async like(id1: string, id2: string) {

    const user1 = await this.findById(id1)

    const user2 = await this.findById(id2)

    user1.myLikes.push(user2)
    user2.meLikes.push(user1)



    const createChat = await new this.chatModel({ users: [user1, user2] }).save()
    const chat = await this.chatModel.findById(createChat.id)


    if (
      (user1.meLikes.includes(user2.id) && user2.myLikes.includes(user1.id)) ||
      (user2.meLikes.includes(user1.id) && user1.myLikes.includes(user2.id))
    ) {
      user1.matches.push({ chat: chat._id, user: user2._id })
      // user1.chats.push(chat)
      user2.matches.push({ chat: chat._id, user: user1._id })
      // user2.chats.push(chat)



    }

    user1.save()
    user2.save()

  }

  async getUserInfo(id: string) {
    return await this.userModel.findById(id,
      'myLikes meLikes matches pictures location age gender name id'
    )
      .populate('myLikes', '_id age gender pictures name location')
      .populate('meLikes', '_id age gender pictures name location')
      .populate('matches.user', '_id age gender pictures name location')
  }

  async getUserChats(id: string) {
    return await this.userModel.findById(id,
      'matches'
    )
      .populate('matches.user', '_id age gender pictures name location')
      .populate('matches.chat')

  }

}
