import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/clients.entity';
import { ClientDto } from './dto/clients.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    return clients.map(x => new ClientDto(x));
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({id});
    return new ClientDto(client);
  }

  async create(createClientDto: ClientDto): Promise<Client> {
    const client = new Client(createClientDto);
    return await this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: ClientDto): Promise<Client> {
    let clientToUpdate = await this.clientRepository.findOneBy({id});
    let update = Object.assign(clientToUpdate, updateClientDto)
    return await this.clientRepository.save(update);
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
