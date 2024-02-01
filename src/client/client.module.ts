import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { AuthentificationModule } from 'src/authentification/authentification.module';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  TypeOrmModule.forFeature([Project]),
  AuthentificationModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
