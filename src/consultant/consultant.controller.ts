import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { Project } from 'src/project/entities/project.entity';

@Controller('consultant')
@UsePipes(ValidationPipe)
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}

  @Post()
  create(@Body() createConsultantDto: CreateConsultantDto) {
    return this.consultantService.create(createConsultantDto);
  }

  @Get()
  findAll() {
    return this.consultantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
    return this.consultantService.update(+id, updateConsultantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultantService.remove(+id);
  }
  @Post(':idCons/projects/:idProj')
  async addConsultantToProject(@Param('idCons') idCons: number, @Param('idProj') idProj: number) {
    return await this.consultantService.addConsultantToProject(idCons, idProj);
  }

  @Delete(':idCons/projects/:idProj')
  async removeConsultantFromProject(@Param('idCons') idCons: number, @Param('idProj') idProj: number) {
    return await this.consultantService.removeConsultantFromProject(idCons, idProj);
  }
  @Get(':username/projects')
  async getProjectsForConsultantByUsername(@Param('username') username: string): Promise<Project[]> {
    return this.consultantService.findAllProjectsForConsultantByUsername(username);
  }
}
