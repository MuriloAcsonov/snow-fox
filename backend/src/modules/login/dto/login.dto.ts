import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

export class loginDto {
  @IsOptional()
  id: number;
  
  @IsNotEmpty()
  tipo: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Exclude()
  senha: string;

}