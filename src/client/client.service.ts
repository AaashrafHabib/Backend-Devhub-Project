import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { response } from 'express';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const client = await this.clientRepository.findOne({ where:{ username:createClientDto.username}} );
    if (client){
      throw new NotFoundException('usename utilisé');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createClientDto.motdepasse, salt);
    createClientDto.motdepasse=hashedPassword;
    return await this.clientRepository.save(createClientDto); 
  }

  findAll() {
    return this.clientRepository.find(); 
   }
  

  findOne(id: number) {
    return this.clientRepository.findOne({ where:{ id:id}} );
  }
  

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id,updateClientDto); 
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }

  
  async addClientToProject(username:string,tiltle:string){
    const client = await this.clientRepository.findOne({ where:{username:username}});
    const project = await this.projectRepository.findOne({ where:{titre:tiltle}});

    if (!client || !project) {
      throw new NotFoundException('Client ou projet introuvable');
    }
    project.client = client;
    await this.projectRepository.save(project);

  }

  async removeClientFromProject(idCli: number, idProj: number) {
    const client = await this.clientRepository.findOne({ where: { id: idCli } });
    const project = await this.projectRepository.findOne({ where: { id: idProj }});

    if (!client || !project) {
        throw new NotFoundException('Consultant ou projet introuvable');
    }

    project.client = null;
    

    await this.projectRepository.save(project);
  }
  async findAllProjectsForClientByUsername(username: string): Promise<Project[]> {
    const client = await this.clientRepository.find({ where: { username }, relations: ['projects'] });

    if (!client || client.length === 0) {
      throw new NotFoundException(`Client with username ${username} not found`);
    }

    // Assuming username is unique, if not, handle multiple clients with the same username as needed

    return client[0].projects;
  }
}
