import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { LoginDto } from './dto/login_dto';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}


  @Post('/login')
  async login(@Body() loginDto:LoginDto) {
    return this.authentificationService.login(loginDto);
  }  
  @Post('/token') 
  async decode (@Body()data:any ) { 

    return this.authentificationService.decode(data); 
  }
}
