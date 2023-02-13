import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioRepository } from './funcionario.repository';
import { EnderecoModule } from '../endereco/endereco.module';

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioService, FuncionarioRepository],
  imports: [EnderecoModule]
})
export class FuncionarioModule {}
