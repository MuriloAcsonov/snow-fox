import { Endereco } from '../../endereco/dto/endereco.interface';
import { Login } from '../../login/dto/login.interface';
import { Telefone } from '../../telefone/dto/telefone.interface';

export interface Funcionario {
  fkId: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  enderecos: Endereco[];
  telefones: Telefone[];
  login: Login;
}
