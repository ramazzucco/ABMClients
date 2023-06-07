import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientService]
})
export class ClientsModule {}
