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
    return clients;
  }

  async findOne(id: number) {
    try {
      const client = await this.clientRepository.findOneBy({id});
      return new ClientDto(client);
    } catch (error) {
      return null;
    }
  }

  async search(params: any) {
    try {
      const clients = await this.clientRepository
        .createQueryBuilder('client')
        .select()
        .where(`client.firstName LIKE :first OR client.lastName LIKE :last`,
          { first: `%${params.firstName}%`, last: `%${params.lastName}%` }
        )
        .getMany();
      return clients.map(x => new ClientDto(x));
    } catch (error) {
      return null;
    }
  }

  async create(createClientDto: ClientDto): Promise<any>{
    const client = new ClientDto(createClientDto);
    return await this.clientRepository.exist({
      where: {
        firstName: createClientDto.firstName, lastName: createClientDto.lastName
      }
    }).then(async res => {
      if(!res) {
        try {
          return await this.clientRepository.save(client);
        } catch (error) {
          const { code, sqlMessage, index } = error;
          return {  code, sqlMessage, index  };
        }
      }
      return null;
    });
  }

  async update(id: number, updateClientDto: Client): Promise<any> {
    try {
      let clientToUpdate = await this.clientRepository.findOneBy({id});
      if(!clientToUpdate) return null;
      let update = Object.assign(clientToUpdate, updateClientDto)
      return await this.clientRepository.save(update);
    } catch (error) {
      const { code, sqlMessage, index } = error;
      return {  code, sqlMessage, index  };
    }
  }

  async delete(id: number): Promise<any> {
    const clientToDelete = await this.clientRepository.findOneBy({id});
    if(clientToDelete) {
      try {
        await this.clientRepository.delete(id);
        return { deleted: true };
      } catch (error) {
        const { code, sqlMessage, index } = error;
        return {  code, sqlMessage, index  };
      }
    }
    return null;
  }
}
