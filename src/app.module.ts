import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entity/clients.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'abmclients',
      entities: [Client],
      synchronize: true,
    }),
    ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
