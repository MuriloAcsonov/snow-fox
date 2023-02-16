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

export class telefoneGetDto {
  @IsOptional()
  fkId: number;
  
  @IsOptional()
  telefoneId: number;

  @IsOptional()
  numero: string;

  @IsOptional()
  principal: boolean;

}