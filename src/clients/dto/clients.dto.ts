import { IsNotEmpty, IsString, IsEmail, IsDate, IsNumber, IsEmpty, isEmail } from 'class-validator';

export class ClientDto {
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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  modified: Date;

  constructor(client: ClientDto) {
    if(!client) return;
    this.firstName = client.firstName;
    this.lastName = client.lastName;
    this.birthday = new Date(client.birthday);
    this.CUIT = client.CUIT;
    this.address = client.firstName;
    this.phone = client.phone;
    this.email = client.email;
  }
}
