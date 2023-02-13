import { Endereco } from './dto/endereco.interface';
import { PoolConnection } from 'mysql2/promise';
import { Logger } from '@nestjs/common';

export class EnderecoRepository {
  private readonly logger = new Logger(EnderecoRepository.name);

  async incluir(endereco: Endereco, connection: PoolConnection) {
    this.logger.log(`Proc Call - incluirendereco`)
    await connection.query('call `db_snowfox`.`PRC_IncluirEndereco`(?,?,?,?,?,?,?,?);',[endereco.fkId, 
                                                                                                        endereco.logradouro, 
                                                                                                        endereco.numero, 
                                                                                                        endereco.complemento, 
                                                                                                        endereco.cidade, 
                                                                                                        endereco.estado, 
                                                                                                        endereco.cep, 
                                                                                                        endereco.principal]);    

  }

  async alterar(endereco: Endereco, connection: PoolConnection) {
    this.logger.log(`Proc Call - editarendereco`)
    await connection.query('call `db_snowfox`.`PRC_EditarEndereco`(?,?,?,?,?,?,?,?,?);',[endereco.fkId,
                                                                                        endereco.enderecoId,
                                                                                        endereco.logradouro, 
                                                                                        endereco.numero, 
                                                                                        endereco.complemento, 
                                                                                        endereco.cidade, 
                                                                                        endereco.estado, 
                                                                                        endereco.cep, 
                                                                                        endereco.principal]);    

  }
  
}
