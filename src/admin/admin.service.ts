import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { response } from 'express';

@Injectable()
export class AdminService
{
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ){}
  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepository.findOne({ where:{ username:createAdminDto.username}} );
    if (admin){
      throw new NotFoundException('usename utilisé');
    }
    else{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAdminDto.motdepasse, salt);
    createAdminDto.motdepasse=hashedPassword;
    return await this.adminRepository.save(createAdminDto);  
  }}

  findAll() {
    return this.adminRepository.find();  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where:{ id:id}} );

    if (!admin) {
      throw new NotFoundException('Administrateur introuvable');
    }

    return admin;
  }

  update(id:number,updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id,updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
  
  findByUsername(username:string){
    return this.adminRepository.findOne({ where:{ username:username}} );
  }

  
}
