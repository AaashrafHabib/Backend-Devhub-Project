import { Admin } from 'src/admin/entities/admin.entity';
import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  username: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  motdepasse: string;

  @OneToMany(() => Project, project => project.client)
  projects: Project[];

}
