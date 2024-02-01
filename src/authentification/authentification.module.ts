import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from 'src/consultant/entities/consultant.entity';
import { Client } from 'src/client/entities/client.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Consultant]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({  
         secret: process.env.SECRET,
         signOptions: {
           expiresIn: 3600, 
           algorithm: "HS512",
         },
       })
   ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationModule {}
