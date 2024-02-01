import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { Consultant } from './entities/consultant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { response } from 'express';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class ConsultantService {
  constructor(
    @InjectRepository(Consultant)
    private consultantRepository: Repository<Consultant>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
 
  ) {}
  async create(createConsultantDto: CreateConsultantDto) {
    const consultant = await this.consultantRepository.findOne({ where:{ username:createConsultantDto.username}} );
    if (consultant) {
      throw new NotFoundException('usename utilisé');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createConsultantDto.motdepasse, salt);
    createConsultantDto.motdepasse=hashedPassword;
    return await this.consultantRepository.save(createConsultantDto);  }

  findAll() {
    return this.consultantRepository.find();
  }

  async findOne(id: number) {
    const consultant = await this.consultantRepository.findOne({ where:{ id:id}} );

    if (!consultant) {
      throw new NotFoundException('Consultant introuvable');
    }

    return consultant;  }

  update(id: number, updateConsultantDto: UpdateConsultantDto) {
    return this.consultantRepository.update(id,updateConsultantDto);
  }

  remove(id: number) {
    return this.consultantRepository.delete(id);
  }
  async addConsultantToProject(idCons:number,idProj:number){
    const consultant = await this.consultantRepository.findOne({ where:{id:idCons}});
    const project = await this.projectRepository.findOne({ where:{id:idProj}});
    if (!consultant || !project) {
      throw new NotFoundException('Consultant ou projet introuvable');
    }
    project.consultant = consultant;
    await this.projectRepository.save(project);

  }

  async removeConsultantFromProject(idCons: number, idProj: number) {
    const consultant = await this.consultantRepository.findOne({ where: { id: idCons } });
    const project = await this.projectRepository.findOne({ where: { id: idProj }});

    if (!consultant || !project) {
        throw new NotFoundException('Consultant ou projet introuvable');
    }

    project.consultant = null;

    await this.consultantRepository.save(consultant);
    await this.projectRepository.save(project);

  }


  async findAllProjectsForConsultantByUsername(username: string): Promise<Project[]> {
    const consultant = await this.consultantRepository.find({ where: { username }, relations: ['projects'] });

    if (!consultant|| consultant.length === 0) {
      throw new NotFoundException(`Client with username ${username} not found`);
    }

    // Assuming username is unique, if not, handle multiple clients with the same username as needed

    return consultant[0].projects;
  }
}
