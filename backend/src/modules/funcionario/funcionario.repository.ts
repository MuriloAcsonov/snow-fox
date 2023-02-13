import { Funcionario } from './dto/funcionario.interface';
import { funcionarioDto } from './dto/funcionario.dto';
import { Logger } from '@nestjs/common';
import { PoolConnection } from 'mysql2/promise';
import { loginDto } from '../login/dto/login.dto';
import { telefoneDto } from '../telefone/dto/telefone.dto';
import { enderecoDto } from '../endereco/dto/endereco.dto';

export class FuncionarioRepository {
  private readonly logger = new Logger(FuncionarioRepository.name);
  private readonly funcionarios: Funcionario[] = [];

  async incluir(funcionario: Funcionario, connection: PoolConnection) {
    this.logger.log(`Proc Call - incluirfuncionario`)
    await connection.query('call `db_snowfox`.`PRC_IncluirFuncionario`(?,?,?,?);',[funcionario.fkId, 
                                                                                                  funcionario.nome, 
                                                                                                  funcionario.cpf, 
                                                                                                  funcionario.dataNascimento]);
    
  }

  async listar(connection: PoolConnection) {
    this.logger.log(`Proc Call - listarfuncionarios`)
    const result = await connection.query('call `db_snowfox`.`PRC_ListarFuncionarios`();')
    return result[0][0];
  }

  async detalhar(id: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - detalharfuncionario`);
    const result = await connection.query('call `db_snowfox`.`PRC_DetalharFuncionario`(?);',[id]);
    const retorno = result[0][0][0];    

    let login = new loginDto();
    login.id = retorno.Id;
    login.email = retorno.Email;
    login.tipo = retorno.Tipo;

    let funcionario = new funcionarioDto();
    funcionario.fkId = retorno.Id;
    funcionario.nome = retorno.Nome;
    funcionario.cpf = retorno.Cpf;
    funcionario.dataNascimento = retorno.DataNascimento;    

    let telefone = new telefoneDto();
    telefone.telefoneId = retorno.TelefoneId;
    telefone.numero = retorno.NumeroTelefone;
    telefone.principal = true;

    let endereco = new enderecoDto();
    endereco.logradouro = retorno.Logradouro;
    endereco.numero = retorno.Numero;
    endereco.complemento = retorno.Complemento;
    endereco.cidade = retorno.Cidade;
    endereco.estado = retorno.Estado;
    endereco.cep = retorno.CEP;
    endereco.enderecoId = retorno.EnderecoId;
    endereco.principal = true;    

    funcionario.login = login;
    funcionario.enderecos = [endereco];
    funcionario.telefones = [telefone];    
    
    return funcionario;

  }

  async alterar(funcionario: Funcionario, connection: PoolConnection) {
    this.logger.log(`Proc Call - editarfuncionario`)
    await connection.query('call `db_snowfox`.`PRC_EditarFuncionario`(?,?,?,?);',[funcionario.fkId, 
                                                                                                  funcionario.nome, 
                                                                                                  funcionario.cpf, 
                                                                                                  funcionario.dataNascimento]);
  }
  
}
