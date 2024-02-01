import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { ConsultantModule } from './consultant/consultant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';
import { Client } from './client/entities/client.entity';
import { Admin } from './admin/entities/admin.entity';
import { Consultant } from './consultant/entities/consultant.entity';
import { AuthentificationModule } from './authentification/authentification.module';
import { JwtMiddleware } from './authentification/JwtMiddleware';
import { AdminController } from './admin/admin.controller';
import { ClientController } from './client/client.controller';
import { ConsultantController } from './consultant/consultant.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ProjectModule, AdminModule, ClientModule, ConsultantModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project',
      synchronize: true, 
      autoLoadEntities: true,
      entities: [Project,Client,Admin,Consultant],
      logging: true,}),
    AuthentificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
// implements NestModule  {

//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware)
//       .forRoutes(AdminController,ClientController,ConsultantController);
//   }

// }
