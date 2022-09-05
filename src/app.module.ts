import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/ne-tinder?retryWrites=true&w=majority',
      {
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // connection.plugin(require('mongoose-autopopulate'))
          return connection
        }
      }),
    UsersModule,
    AuthModule,
    // ChatModule,
    MulterModule.register({ dest: './uploads' })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


//mongodb+srv://admin:admin@ne-tinder.4n3kn.mongodb.net/?retryWrites=true&w=majority