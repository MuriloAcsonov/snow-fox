import { IsNotEmpty, IsOptional } from 'class-validator';

export class telefoneDto {
  @IsOptional()
  fkId: number;
  
  @IsOptional()
  telefoneId: number;

  @IsNotEmpty()
  numero: string;

  @IsNotEmpty()
  principal: boolean;

}