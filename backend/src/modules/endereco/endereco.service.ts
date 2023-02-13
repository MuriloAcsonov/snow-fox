import { Injectable } from '@nestjs/common';
import { enderecoDto } from './dto/endereco.dto';
import { Endereco } from './dto/endereco.interface';

@Injectable()
export class EnderecoService {
  private readonly endereco: Endereco[] = [];

  create(endereco: Endereco) {
    this.endereco.push(endereco);
    return 'This action adds a new endereco';
  }

  findAll() {
    return this.endereco;
  }

  findOne(id: number) {
    return this.endereco[id];
  }

  update(id: number, endereco: Endereco) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
