import { Logger } from '@nestjs/common';
import { Telefone } from './dto/telefone.interface';
import { PoolConnection } from 'mysql2/promise';

export class TelefoneRepository {
  private readonly logger = new Logger(TelefoneRepository.name);

  async incluir(telefone: Telefone, connection: PoolConnection) {
    this.logger.log(`Proc Call - incluirtelefone`);
    await connection.query('call `db_snowfox`.`PRC_IncluirTelefone`(?,?,?)', [telefone.fkId, telefone.numero, telefone.principal]);
    
  }

  async alterar(telefone: Telefone, connection: PoolConnection) {
    this.logger.log(`Proc Call - editartelefone`);
    await connection.query('call `db_snowfox`.`PRC_EditarTelefone`(?,?,?,?)', [telefone.fkId, telefone.telefoneId, telefone.numero, telefone.principal]);
    
  }

}
