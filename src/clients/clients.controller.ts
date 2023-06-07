import { Controller, Get, Post, Body, Put, Delete, Param, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { Client } from './entity/clients.entity';
import { ClientService } from './clients.service';
import { Response } from 'express';
import { ClientDto } from './dto/clients.dto';
import BaseController from 'src/commons/base.controller';

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

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const client = await this.clientService.findOne(id);
    if(!client) this.throwError({ name: 'NotFoundException', message: 'CLIENT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    return res.status(HttpStatus.OK).json(client);
  }

  @Post()
  async create(@Body() createClientDto: ClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClientDto: ClientDto): Promise<Client> {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.clientService.delete(id);
  }
}
