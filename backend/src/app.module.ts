import { Module } from '@nestjs/common';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [FuncionarioModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
