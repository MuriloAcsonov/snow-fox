import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoRepository } from './endereco.repository';
import { EnderecoController } from './endereco.controller';

@Module({
    controllers: [EnderecoController],
    providers: [EnderecoService, EnderecoRepository],
    exports: [EnderecoRepository]
})

export class EnderecoModule {}
