import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    titre: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsString()
    fichier_charge: string;
  
    @IsNotEmpty()
    @IsDateString()
    date_debut: Date;
  
    @IsNotEmpty()
    @IsDateString()
    date_fin: Date;

}
