import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/clients.entity';
import { ClientDto } from './dto/clients.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientDto])],
  controllers: [ClientsController],
  providers: [ClientService, ClientDto]
})
export class ClientsModule {}
