import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login_dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Client } from 'src/client/entities/client.entity';
import { Consultant } from 'src/consultant/entities/consultant.entity';
import 'dotenv/config';


@Injectable()
export class AuthentificationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    
  private AdminRepository: Repository<Admin>,
  @InjectRepository(Client)
  private ClientRepository: Repository<Client>,
  @InjectRepository(Consultant)
  private ConsultantRepository: Repository<Consultant>
  ){}
  async login(loginDto: LoginDto) {
    const role =loginDto.role;
    if (role=="Client") {
      const client = await this.ClientRepository.findOne({ where: { username: loginDto.username } });
     if (client && (await bcrypt.compare(loginDto.password, client.motdepasse))) {
  
      require("dotenv").config();
      const payload = { username: client.username, password: client.motdepasse ,role:"Client"}; 
      

      return { 
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
    }
    if (role=="Consultant") {
      const consultant = await this.ConsultantRepository.findOne({ where: { username: loginDto.username } });
     if (consultant && (await bcrypt.compare(loginDto.password, consultant.motdepasse))) {
  
      require("dotenv").config();
      const payload = { username: consultant.username, password: consultant.motdepasse ,role:"Consultant"}; 
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
    }
    if (role=="Administrator") {
      const admin = await this.AdminRepository.findOne({ where: { username: loginDto.username } });
     if (admin && (await bcrypt.compare(loginDto.password,admin.motdepasse))) {
      require("dotenv").config();
      const payload = { username: admin.username, password: admin.motdepasse,role:"Administrator" }; 
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
    }
    
  }
decode(data:any){ 

return this.jwtService.decode(data.access_token); 

}




}
