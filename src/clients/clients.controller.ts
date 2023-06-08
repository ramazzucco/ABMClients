import { Controller, Get, Post, Body, Put, Delete, Query, Param, Res, HttpStatus, HttpException, UsePipes } from '@nestjs/common';
import { Client } from './entity/clients.entity';
import { ClientService } from './clients.service';
import { Response } from 'express';
import BaseController from 'src/commons/base.controller';
import { ClientDto } from './dto/clients.dto';
import { EmailValidationPipe } from 'src/commons/vlidations/email-validation.pipe';
import { CuitValidationPipe } from 'src/commons/vlidations/cuit-validaton.pipe';

@Controller('clients')
export class ClientsController extends BaseController {
  constructor(private readonly clientService: ClientService) {
    super('Clients');
  }

  @Get()
  async findAll(@Res() res: Response) {
    const clients = await this.clientService.findAll();
    if(!clients) this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    return res.status(HttpStatus.OK).json(clients);
  }

  @Get('/search')
  async search(@Query() params: any, @Res() res: Response) {
    const client = await this.clientService.search(params);
    if(!client) this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    return res.status(HttpStatus.OK).json(client);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const client = await this.clientService.findOne(id);
    if(!client) this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    return res.status(HttpStatus.OK).json(client);
  }

  @Post()
  @UsePipes(
    new EmailValidationPipe('Clients'),
    new CuitValidationPipe('Clients')
  )
  async create(@Body() createClientDto: ClientDto, @Res() res: Response): Promise<any> {
    console.log(createClientDto)
    const newClient = await this.clientService.create(createClientDto);
    if(newClient) {
      return newClient.sqlMessage
        ? this.throwError({ name: newClient.code, message: newClient.sqlMessage, status: HttpStatus.INTERNAL_SERVER_ERROR })
        : res.status(HttpStatus.OK).json(newClient);
    } else {
      throw new HttpException('CLIENT_ALREADY_EXIST', HttpStatus. BAD_REQUEST)
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClientDto: Client, @Res() res: Response): Promise<any> {
    const clientUpdated = await this.clientService.update(id, updateClientDto);
    if(clientUpdated) {
      return clientUpdated.sqlMessage
        ? this.throwError({ name: clientUpdated.code, message: clientUpdated.sqlMessage, status: HttpStatus.INTERNAL_SERVER_ERROR })
        : res.status(HttpStatus.OK).json(clientUpdated);
    } else {
      this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response): Promise<any> {
    const clientDeleted =  await this.clientService.delete(id);
    if(clientDeleted && clientDeleted.deleted)
      return res.status(HttpStatus.OK).json(clientDeleted);
    else if(clientDeleted && clientDeleted.sqlMessage)
      this.throwError({ name: clientDeleted.code, message: clientDeleted.sqlMessage, status: HttpStatus.INTERNAL_SERVER_ERROR })
    else
      this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND })
  }
}
