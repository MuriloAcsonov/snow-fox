import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { TelefoneService } from './telefone.service';
import { telefoneDto, telefoneGetDto } from './dto/telefone.dto';

@Controller('telefone')
export class TelefoneController {
  private readonly logger = new Logger(TelefoneController.name);

  constructor(private readonly telefoneService: TelefoneService) {}
  
  @Patch(':id')
  async update(@Param('id') id: number, @Body() telefoneDto: telefoneDto[], @Res() res: Response) {
    this.logger.log(`Route PATCH - telefone`);
    let retorno;
    try{
      retorno = await this.telefoneService.update(id, telefoneDto);
      this.logger.log(`Route PATCH - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno));
    }
    catch(error){
      this.logger.log(`Route PATCH - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }

    return retorno;
  }

  @Post()
  async create(@Body() telefoneDto: telefoneDto[], @Res() res: Response) {
    this.logger.log(`Route POST - telefone`);
    let retorno;
    try{
      retorno = await this.telefoneService.create(telefoneDto);
      this.logger.log(`Route POST - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno));
    }
    catch(error){
      this.logger.log(`Route POST - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }

    return retorno;
  }
  
  @Get(':id/all')
  async findAll(@Param('id') id: number, @Res() res: Response) {
    this.logger.log(`Route GET - list telefone`);
    let retorno;
    try{
      retorno = await this.telefoneService.findAll(id);
      this.logger.log(`Route GET - status: ${HttpStatus.OK}`);
      this.logger.log(`response - ${JSON.stringify(retorno)}`);
      res.status(HttpStatus.OK).json(retorno);
    }
    catch(error){
      this.logger.log(`Route GET - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }
    return retorno;
  }

  @Get(':id')
  async findStar(@Param('id') id: number, @Res() res: Response) {
    this.logger.log(`Route GET Starred - favorite telefone`);
    let retorno;
    try{
      retorno = await this.telefoneService.findStar(id);
      this.logger.log(`Route GET Starred - status: ${HttpStatus.OK}`);
      this.logger.log(`response - ${JSON.stringify(retorno)}`);
      res.status(HttpStatus.OK).json(retorno);
    }
    catch(error){
      this.logger.log(`Route GET Starred - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }
    return retorno;
  }

  @Get(':id/:telefoneId')
  async findOne(@Param('id') id: number, @Param('telefoneId') telefoneId: number, @Res() res: Response) {
    this.logger.log(`Route GET One - detail telefone`);
    let retorno;
    try{
      retorno = await this.telefoneService.findOne(id, telefoneId);
      this.logger.log(`Route GET One - status: ${HttpStatus.OK}`);
      this.logger.log(`response - ${JSON.stringify(retorno)}`);
      res.status(HttpStatus.OK).json(retorno);
    }
    catch(error){
      this.logger.log(`Route GET One - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }
    return retorno;
  }

  @Delete(':id/:telefoneId')
  async remove(@Param('id') id: number, @Param('telefoneId') telefoneId: number, @Res() res: Response) {
    this.logger.log(`Route DELETE - telephone`);
    let retorno;
    try{
      retorno = await this.telefoneService.remove(+id, +telefoneId);
      this.logger.log(`Route DELETE - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno));
    }
    catch(error){
      this.logger.log(`Route DELETE - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }

    return retorno;
  }

}
