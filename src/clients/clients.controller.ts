import { Controller, Get, Post, Body, Put, Delete, Param, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { Client } from './entity/clients.entity';
import { ClientService } from './clients.service';
import { Response } from 'express';
import { ClientDto } from './dto/clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const clients = await this.clientService.findAll();
    if(!clients) throw new NotFoundException('CLIENT_NOT_FOUND');
    return res.status(HttpStatus.OK).json(clients);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const client = await this.clientService.findOne(id);
    if(!client) throw new NotFoundException('CLIENT_NOT_FOUND');
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
