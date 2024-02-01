import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthentificationModule } from 'src/authentification/authentification.module';
import { JwtMiddleware } from 'src/authentification/JwtMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Project]),AuthentificationModule],
  controllers: [ProjectController],
  providers: [ProjectService, JwtService, JwtMiddleware],
})
export class ProjectModule {}
