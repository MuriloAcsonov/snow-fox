import { Injectable } from '@nestjs/common';
import { Telefone } from './dto/telefone.interface';
import { TelefoneRepository } from './telefone.repository';
import { poolPromise } from '../../common/mysql/mysql.service'

@Injectable()
export class TelefoneService {
  constructor(private readonly telefoneRepo: TelefoneRepository) {}

  async create(telefone: Telefone) {
    try {
      let connection = await poolPromise.getConnection();
      await connection.beginTransaction();      
      this.telefoneRepo.incluir(telefone, connection);
      await connection.commit()
    }
    catch(error){
      
    }
    
  }

}
