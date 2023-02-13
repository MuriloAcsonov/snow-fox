import { Logger, Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { loginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);

  constructor(private readonly loginService: LoginService) {}

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    this.logger.log(`Route DELETE - login`);
    let retorno;
    try{
      retorno = await this.loginService.remove(+id);
      this.logger.log(`Route DELETE - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno))
    }
    catch(error){
      this.logger.log(`Route DELETE - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }

    return retorno;
  }

  /*
  @Post()
  create(@Body() loginDto: loginDto) {
    return this.loginService.create(loginDto);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() loginDto: loginDto) {
    return this.loginService.update(+id, loginDto);
  }  
  */
}
