import { IsNotEmpty, IsString, IsEmail, IsDate, IsNumber } from 'class-validator';
import { Client } from '../entity/clients.entity';

export class ClientDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  CUIT: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDate()
  modified: Date;

  constructor(client: Client) {
    this.id = client.id;
    this.firstName = client.firstName;
    this.lastName = client.lastName;
    this.birthday = client.birthday;
    this.CUIT = client.CUIT;
    this.address = client.firstName;
    this.phone = client.phone;
    this.email = client.email;
  }
}
