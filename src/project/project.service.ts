import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
   
    const project = await this.projectRepository.findOne({ where:{ titre:createProjectDto.titre}} );
    if (project){
      throw new NotFoundException('titre utilisé');
    }
    return this.projectRepository.save(createProjectDto); 
  } 
  

  async findAll() {
    return await this.projectRepository.find({
      relations: ['client', 'consultant'],
    });
     
    
  }
  async findall() {
    let projs: any[] = [];
    const p = await this.projectRepository.find({
      relations: ['client', 'consultant'],
    }); 
  
    for (let proj of p) {
      if (!proj.consultant) {
        projs.push(proj);
      }
    }
    
    return projs;
  }
  

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where:{ id:id}} );

    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }

    return project;  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id,updateProjectDto);
  }

  async remove(titre: string) {
    const project = await this.projectRepository.findOne({ where:{titre:titre}});
    project.client=null;
    project.consultant=null;
    return this.projectRepository.delete(project.id);
  }
}
