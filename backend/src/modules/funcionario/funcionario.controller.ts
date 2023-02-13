import { Logger, Controller, Get, Post, Body, Patch, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FuncionarioService } from './funcionario.service';
import { funcionarioDto } from './dto/funcionario.dto';

@Controller('funcionario')
export class FuncionarioController {
  private readonly logger = new Logger(FuncionarioController.name);

  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  async create(@Res() res: Response, @Body() funcionarioDto: funcionarioDto) {
    this.logger.log(`Route POST - funcionario`);
    let retorno;
    try{
      retorno = await this.funcionarioService.create(funcionarioDto);
      this.logger.log(`Route POST - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno))
    }
    catch(error){
      this.logger.log(`Route POST - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }

    return retorno;
  }

  @Get()
  async findAll(@Res() res: Response) {
    this.logger.log(`Route GET - listar funcionario`);
    let retorno;
    try{
      retorno = await this.funcionarioService.findAll();
      this.logger.log(`Route GET - status: ${HttpStatus.OK}`);
      this.logger.log(`response - ${JSON.stringify(retorno)}`);
      res.status(HttpStatus.OK).json(retorno);
    }
    catch(error){
      this.logger.log(`Route GET - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }
    return retorno;
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    this.logger.log(`Route GET1 - detalhar funcionario`);
    let retorno;
    try{
      retorno = await this.funcionarioService.findOne(+id);
      this.logger.log(`Route GET1 - status: ${HttpStatus.OK}`);
      this.logger.log(`response - ${JSON.stringify(retorno)}`);
      res.status(HttpStatus.OK).json(retorno);
    }
    catch(error){
      this.logger.log(`Route GET1 - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }
    return retorno;
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() funcionarioDto: funcionarioDto) {
    this.logger.log(`Route PATCH - funcionario`);
    let retorno;
    try{
      retorno = await this.funcionarioService.update(id, funcionarioDto);
      this.logger.log(`Route PATCH - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno))
    }
    catch(error){
      this.logger.log(`Route PATCH - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }

    return retorno;
  }
  
}
