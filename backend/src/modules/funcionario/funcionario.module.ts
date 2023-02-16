import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioRepository } from './funcionario.repository';
import { EnderecoModule } from '../endereco/endereco.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioService, FuncionarioRepository],
  imports: [EnderecoModule, TelefoneModule, LoginModule]
})
export class FuncionarioModule {}
