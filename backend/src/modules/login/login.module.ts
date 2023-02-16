import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoginRepository } from './login.repository';

@Module({
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
  exports: [LoginRepository]
})
export class LoginModule {}
