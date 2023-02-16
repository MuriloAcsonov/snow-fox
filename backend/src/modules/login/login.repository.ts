import { Logger } from '@nestjs/common';
import { Login } from './dto/login.interface';
import { PoolConnection } from 'mysql2/promise';
import { loginDto } from './dto/login.dto';

export class LoginRepository {
  private readonly logger = new Logger(LoginRepository.name);

  async incluir(login: Login, connection: PoolConnection) {
    this.logger.log(`Proc Call - incluirlogin`);
    const result = await connection.query('set @loginId = 0; call `db_snowfox`.`PRC_IncluirLogin`(?,?,?, @loginId); select @loginId;', [login.tipo, 
                                                                                                                          login.email, 
                                                                                                                          login.senha]);
    
    let returnDict = new Object();    
    returnDict['loginId'] = result[0][2][0]['@loginId'];
    this.logger.log(`Proc Call Result - incluirlogin - ${returnDict['loginId']}`);

    return returnDict;

  }

  async alterar(login: Login, connection: PoolConnection) {
    this.logger.log(`Proc Call - editarlogin`);
    await connection.query('call `db_snowfox`.`PRC_EditarLogin`(?,?,?);', [login.id,
                                                                          login.tipo, 
                                                                          login.email]);

  }

  async deletar(id: number, connection: PoolConnection) {
    this.logger.log(`Proc Call - deletarlogin`);
    await connection.query('call `db_snowfox`.`PRC_DeletarLogin`(?);', [id]);

  }

  async verificar(login: Login, connection: PoolConnection) {
    this.logger.log(`Proc Call - verificarlogin`);
    const result = await connection.query('call `db_snowfox`.`PRC_VerificarLogin`(?,?,?);', [login.email, login.senha, login.tipo]);

    if(result[0][0].length > 0){
      const resultVerify = result[0][0][0];
      this.logger.log(`Login - verificado com sucesso`);
      const login = new loginDto();
      login.id = resultVerify.Id;
      login.tipo = resultVerify.Tipo;

      return login;
    }
    this.logger.log(`Login - nao foi encontrado login`);
    return null;

  }

  async esquecer(login: Login, connection: PoolConnection) {
    this.logger.log(`Proc Call - esquecersenha`);
    const result = await connection.query('call `db_snowfox`.`PRC_EsquecerSenha`(?,?);', [login.email, login.tipo]);

    if(result[0][0].length > 0){
      const resultVerify = result[0][0][0];
      this.logger.log(`Login - senha encontrada`);
      const login = new loginDto();
      login.senha = resultVerify.Senha;

      return login;
    }
    this.logger.log(`Login - nao foi encontrado usuario`);
    return null;

  }

}
