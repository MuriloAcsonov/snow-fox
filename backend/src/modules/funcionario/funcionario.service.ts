import { Injectable, Logger } from '@nestjs/common';
import { funcionarioDto } from './dto/funcionario.dto';
import { Funcionario } from './dto/funcionario.interface';
import { FuncionarioRepository } from './funcionario.repository';
import { LoginRepository } from '../login/login.repository';
import { EnderecoRepository } from '../endereco/endereco.repository';
import { TelefoneRepository } from '../telefone/telefone.repository';
import { poolPromise } from '../../common/mysql/mysql.service'

@Injectable()
export class FuncionarioService {
  private readonly logger = new Logger(FuncionarioService.name);

  constructor(private readonly funcionarioRepo: FuncionarioRepository) {}

  async create(funcionario: Funcionario) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.debug(`BeginTransaction - inclusao funcionario`);
      await connection.beginTransaction();

      const loginRepo = new LoginRepository();
      this.logger.log(`Incluir - login`);
      const result = await loginRepo.incluir(funcionario.login, connection);
      funcionario.fkId = result['loginId'];      

      this.logger.log(`Incluir - funcionario`);
      await this.funcionarioRepo.incluir(funcionario, connection);

      const enderecoRepo = new EnderecoRepository();
      this.logger.log(`Incluir - enderecos`);
      funcionario.enderecos.forEach(async (endereco) => {
        endereco.fkId = funcionario.fkId;        
        await enderecoRepo.incluir(endereco, connection);
      });

      const telefoneRepo = new TelefoneRepository();
      this.logger.log(`Incluir - telefones`);
      funcionario.telefones.forEach(async (telefone) => {
        telefone.fkId = funcionario.fkId;
        await telefoneRepo.incluir(telefone, connection);
      });     
      
      await connection.commit();
      this.logger.debug(`Commit - inclusao funcionario`);
      return {"result": "Funcionario criado com sucesso!"}

    }
    catch(error){
      this.logger.error(`Error - incluir funcionario`);
      await connection.rollback();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Incluir - Release connection`);
      await connection.release();
    }
    
  }

  async findAll() {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.log(`Listar - funcionario`);
      const funcionarios = await this.funcionarioRepo.listar(connection);
      return funcionarios;
    }
    catch(error){      
      this.logger.error(`Error - listar funcionarios`);
      await connection.release();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Listar - Release connection`);
      await connection.release();
    }
    
  }

  async findOne(id: number) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.log(`Detalhar - funcionario`);
      const funcionario = await this.funcionarioRepo.detalhar(id, connection);
      return funcionario;
    }
    catch(error){
      this.logger.error(`Error - detalhar funcionarios`);
      await connection.release();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Detalhar - Release connection`);
      await connection.release();
    }

  }

  async update(id, funcionario: Funcionario) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.debug(`BeginTransaction - alterar funcionario`);
      await connection.beginTransaction();

      const loginRepo = new LoginRepository();
      this.logger.log(`Alterar - login`);
      funcionario.login.id = id;      
      await loginRepo.alterar(funcionario.login, connection);

      this.logger.log(`Alterar - funcionario`);
      funcionario.fkId = id;
      await this.funcionarioRepo.alterar(funcionario, connection);

      const enderecoRepo = new EnderecoRepository();
      this.logger.log(`Alterar - endereco`);
      funcionario.enderecos.forEach(async (endereco) => {
        endereco.fkId = id;
        await enderecoRepo.alterar(endereco, connection);
      });

      const telefoneRepo = new TelefoneRepository();
      this.logger.log(`Incluir - telefones`);
      funcionario.telefones.forEach(async (telefone) => {
        telefone.fkId = id;
        await telefoneRepo.alterar(telefone, connection);
      });     
      
      await connection.commit();
      this.logger.debug(`Commit - alterar funcionario`);
      return {"result": "Funcionario alterado com sucesso!"}

    }
    catch(error){
      this.logger.error(`Error - alterar funcionario`);
      await connection.rollback();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Alterar - Release connection`);
      await connection.release();
    }
  }

}
