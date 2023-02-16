import { Module } from '@nestjs/common';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { LoginModule } from './modules/login/login.module';
import { TelefoneModule } from './modules/telefone/telefone.module';

@Module({
  imports: [FuncionarioModule, LoginModule, TelefoneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
