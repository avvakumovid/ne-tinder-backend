import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainGateway } from './main.gateway';

@Module({
  providers: [MainGateway, MainService]
})
export class MainModule { }
