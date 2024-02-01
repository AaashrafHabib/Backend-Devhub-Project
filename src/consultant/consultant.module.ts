import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { ConsultantController } from './consultant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';
import { Project } from 'src/project/entities/project.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Consultant]),
  TypeOrmModule.forFeature([Project])],
  controllers: [ConsultantController],
  providers: [ConsultantService],
})
export class ConsultantModule {}
