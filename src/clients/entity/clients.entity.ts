import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: Date;

  @Column()
  CUIT: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  modified: Date;

  constructor(client: Client) {
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
