import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Project } from 'src/project/entities/project.entity';

@Controller('client')
@UsePipes(ValidationPipe)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
  @Post(':username/projects/:title')
  async addClientToProject(@Param('username') username: string, @Param('title') title: string) {
    return await this.clientService.addClientToProject(username, title);
  }

  @Delete(':idCli/projects/:idProj')
  async removeClientFromProject(@Param('idCli') idCli: number, @Param('idProj') idProj: number) {
    return await this.clientService.removeClientFromProject(idCli, idProj);
  }
  @Get(':username/projects')
  async getProjectsForClientByUsername(@Param('username') username: string): Promise<Project[]> {
    return this.clientService.findAllProjectsForClientByUsername(username);
  }


}
