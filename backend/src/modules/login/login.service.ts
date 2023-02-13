import { Injectable, Logger } from '@nestjs/common';
import { Login } from './dto/login.interface';
import { LoginRepository } from './login.repository';
import { poolPromise } from '../../common/mysql/mysql.service'

@Injectable()
export class LoginService {
  constructor(private readonly loginRepo: LoginRepository) {}

  private readonly logger = new Logger(LoginService.name);

  async remove(id: number) {
    let connection = await poolPromise.getConnection();
    try {
      this.logger.debug(`BeginTransaction - deletar login`);
      await connection.beginTransaction();
      
      this.logger.debug(`Deletar - login`);
      this.loginRepo.deletar(id, connection);

      await connection.commit();
      this.logger.debug(`Commit - deletar funcionario`);
      return {"result": "Login deletado com sucesso!"}
    }
    catch(error){
      this.logger.error(`Error - deletar login`);
      await connection.rollback();      
      this.logger.error(`Rollback - ${error}`);
    }
    finally{
      this.logger.log(`Deletar - Release connection`);
      await connection.release();
    }
    
  }

}
