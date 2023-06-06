import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './clients.entity';
import { CreateClientDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-clients.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOneBy({id});
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client();
    client.firstName = createClientDto.firstName;
    client.lastName = createClientDto.lastName;
    client.email = createClientDto.email;
    return await this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOneBy({id});
    client.firstName = updateClientDto.firstName;
    client.lastName = updateClientDto.lastName;
    client.email = updateClientDto.email;
    return await this.clientRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
