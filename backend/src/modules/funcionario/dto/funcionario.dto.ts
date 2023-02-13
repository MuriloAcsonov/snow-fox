import { IsNotEmpty, IsOptional, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { enderecoDto } from '../../endereco/dto/endereco.dto';
import { loginDto } from '../../login/dto/login.dto';
import { telefoneDto } from '../../telefone/dto/telefone.dto';

export class funcionarioDto {
  @IsOptional()
  fkId: number;
  
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()  
  @IsDateString()
  dataNascimento: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => enderecoDto)
  enderecos: enderecoDto[];

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => loginDto)
  login: loginDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => telefoneDto)
  telefones: telefoneDto[];

}