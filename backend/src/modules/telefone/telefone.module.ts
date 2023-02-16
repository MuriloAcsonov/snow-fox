import { Module } from '@nestjs/common';
import { TelefoneService } from './telefone.service';
import { TelefoneController } from './telefone.controller';
import { TelefoneRepository } from './telefone.repository';

@Module({
  controllers: [TelefoneController],
  providers: [TelefoneService, TelefoneRepository],
  exports: [TelefoneRepository]
})
export class TelefoneModule {}
