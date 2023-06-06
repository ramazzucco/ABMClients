// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ClientsModule } from './clients/clients.module';
// import { ClientService } from './clients/clients.service';

// @Module({
//   imports: [ClientsModule],
//   controllers: [AppController],
//   providers: [AppService, ClientService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/clients.entity';
import { ClientsController } from './clients/clients.controller';
import { ClientService } from './clients/clients.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'abmclients',
      entities: [Client],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ClientsController],
  providers: [ClientService],
})
export class AppModule {}
