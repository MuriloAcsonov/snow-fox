import { Logger } from '@nestjs/common';
import { Telefone } from './dto/telefone.interface';
import { PoolConnection } from 'mysql2/promise';
import { telefoneDto } from './dto/telefone.dto';

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

  async listar(id: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - consultartelefoneId`);
    const result = await connection.query('call `db_snowfox`.`PRC_ConsultarTelefoneId`(?)', [id]);

    if(result[0][0].length > 0){
      const telefones = [];
      this.logger.log(`Telefone - telephones founded`);
      result[0][0].forEach(async (resultTel) => {
        const telefone = new telefoneDto();
        telefone.fkId = resultTel.FKId;
        telefone.telefoneId = resultTel.CounterTelefone;
        telefone.numero = resultTel.Numero;
        telefone.principal = resultTel.Principal;

        telefones.push(telefone);
      });

      return telefones;
    }
    this.logger.log(`Telefone - any telephone was founded`);
    return null;
    
  }

  async detalhar(id: number, telefoneId: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - detalhartelefone`);
    const result = await connection.query('call `db_snowfox`.`PRC_DetalharTelefone`(?,?)', [id,telefoneId]);

    if(result[0][0].length > 0){
      const resultVerify = result[0][0][0];
      this.logger.log(`Telefone - telephone founded`);
      const telefone = new telefoneDto();
      telefone.fkId = resultVerify.FKId;
      telefone.telefoneId = resultVerify.CounterTelefone;
      telefone.numero = resultVerify.Numero;
      telefone.principal = resultVerify.Principal;

      return telefone;
    }
    this.logger.log(`Telefone - not founded any telephone`);
    return null;
    
  }

  async detalharPrincipal(id: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - telefoneprincipal`);
    const result = await connection.query('call `db_snowfox`.`PRC_TelefonePrincipal`(?)', [id]);

    if(result[0][0].length > 0){
      const resultVerify = result[0][0][0];
      this.logger.log(`Telefone - telephone founded`);
      const telefone = new telefoneDto();
      telefone.fkId = resultVerify.FKId;
      telefone.telefoneId = resultVerify.CounterTelefone;
      telefone.numero = resultVerify.Numero;
      telefone.principal = resultVerify.Principal;

      return telefone;
    }
    this.logger.log(`Telefone - not founded any telephone`);
    return null;
    
  }

  async deletar(id: number, telefoneId: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - deletartelefone`);
    await connection.query('call `db_snowfox`.`PRC_DeletarTelefone`(?,?);', [id, telefoneId]);

  }

}
