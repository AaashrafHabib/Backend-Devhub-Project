import { Client } from 'src/client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Consultant } from 'src/consultant/entities/consultant.entity';
import { ProjectStatus } from './project.enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  fichier_charge: string;

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.NotStarted })
  status: ProjectStatus;

  @ManyToOne(() => Client, client => client.projects, { onDelete: 'SET NULL' })
  client: Client;


  @ManyToOne(() => Consultant, Consultant => Consultant.projects, { onDelete: 'SET NULL' })
  consultant: Consultant;
}
