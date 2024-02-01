import { Admin } from 'src/admin/entities/admin.entity';
import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';


@Entity()
export class Consultant {
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

  @OneToMany(() => Project, project => project.consultant)
  projects: Project[];
}
