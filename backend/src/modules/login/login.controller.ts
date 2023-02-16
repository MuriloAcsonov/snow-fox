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

  @Post('verify')
  async verify(@Res() res: Response, @Body() loginDto: loginDto) {
    this.logger.log(`Route POST Verify - login`);
    let retorno;
    try{
      retorno = await this.loginService.verify(loginDto);
      this.logger.log(`Route POST Verify - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno));
    }
    catch(error){
      this.logger.log(`Route POST Verify - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error));
    }

    return retorno;
  }

  @Post('forget')
  async forget(@Body() loginDto: loginDto, @Res() res: Response) {
    this.logger.log(`Route GET Forget - login`);
    let retorno;
    try{
      retorno = await this.loginService.forget(loginDto);
      this.logger.log(`Route GET Forget - status: ${HttpStatus.OK}`);
      res.status(HttpStatus.CREATED).json(JSON.stringify(retorno))
    }
    catch(error){
      this.logger.log(`Route GET Forget - status: ${HttpStatus.BAD_REQUEST}`);
      res.status(HttpStatus.BAD_REQUEST).json(JSON.stringify(error))
    }

    return retorno;
  }

}
