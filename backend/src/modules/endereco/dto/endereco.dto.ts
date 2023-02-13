import { IsOptional, IsNotEmpty } from 'class-validator';

export class enderecoDto {
  @IsOptional()
  fkId: number;
  
  @IsNotEmpty()
  logradouro: string;

  @IsNotEmpty()
  numero: string;
  
  @IsOptional()
  complemento: string;
  
  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  principal: boolean;

  @IsOptional()
  enderecoId: number;
  
}