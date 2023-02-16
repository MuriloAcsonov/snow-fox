import { Injectable, Logger } from '@nestjs/common';
import { Telefone } from './dto/telefone.interface';
import { TelefoneRepository } from './telefone.repository';
import { poolPromise } from '../../common/mysql/mysql.service'

@Injectable()
export class TelefoneService {
  private readonly logger = new Logger(TelefoneService.name);
  constructor(private readonly telefoneRepo: TelefoneRepository) {}

  async update(id: number, telefones: Telefone[]) {
    let connection;
    try {
      connection = await poolPromise.getConnection();
      this.logger.debug(`BeginTransaction - update telefone`);
      await connection.beginTransaction();
      telefones.forEach(async (telefone) => {
        telefone.telefoneId = id;
        await this.telefoneRepo.alterar(telefone, connection);
      });      
      await connection.commit();
    }
    catch(error){
      this.logger.error(`Error - update telefone`);
      await connection.rollback();
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Update - Release connection`);
      await connection.release();
    }
    
  }

  async create(telefones: Telefone[]) {
    let connection;
    try {
      connection = await poolPromise.getConnection();
      this.logger.debug(`BeginTransaction - create new telefone`);
      await connection.beginTransaction();
      telefones.forEach(async (telefone) => {
        await this.telefoneRepo.incluir(telefone, connection);
      });
      await connection.commit();
    }
    catch(error){
      this.logger.error(`Error - create telefone`);
      await connection.rollback();
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Create - Release connection`);
      await connection.release();
    }
    
  }

  async findAll(id: number) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.log(`List - telefone`);
      const telefones = await this.telefoneRepo.listar(id, connection);
      return telefones;
    }
    catch(error){      
      this.logger.error(`Error - list telefones`);
      await connection.release();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`List - Release connection`);
      await connection.release();
    }
    
  }

  async findOne(id: number, telefoneId: number) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.log(`Detail - telefone`);
      const telefones = await this.telefoneRepo.detalhar(id, telefoneId, connection);
      return telefones;
    }
    catch(error){      
      this.logger.error(`Error - detail telefone`);
      await connection.release();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`List - Release connection`);
      await connection.release();
    }
    
  }

  async findStar(id: number) {
    let connection;
    try {      
      connection = await poolPromise.getConnection();
      this.logger.log(`Starred - telefone`);
      const telefones = await this.telefoneRepo.detalharPrincipal(id, connection);
      return telefones;
    }
    catch(error){      
      this.logger.error(`Error - Starred telefone`);
      await connection.release();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Starred - Release connection`);
      await connection.release();
    }
    
  }

  async remove(id: number, telefoneId: number) {
    let connection = await poolPromise.getConnection();
    try {
      this.logger.debug(`BeginTransaction - delete telephone`);
      await connection.beginTransaction();
      
      this.logger.debug(`Delete - telephone`);
      this.telefoneRepo.deletar(id, telefoneId, connection);

      await connection.commit();
      this.logger.debug(`Commit - delete telephone`);
      return {"result": "Telefone deletado com sucesso!"}
    }
    catch(error){
      this.logger.error(`Error - delete telephone`);
      await connection.rollback();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Deletar - Release connection`);
      await connection.release();
    }
    
  }

}
