import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class CreateConsultantDto {
    @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  motdepasse: string;
}
