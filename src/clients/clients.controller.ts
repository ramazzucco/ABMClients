import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { Client } from './clients.entity';
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.clientService.delete(id);
  }
}
