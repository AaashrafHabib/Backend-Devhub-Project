import { Client } from 'src/client/entities/client.entity';
import { Consultant } from 'src/consultant/entities/consultant.entity';
import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  motdepasse: string;

  

  
}
