import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelefoneService } from './telefone.service';
import { telefoneDto } from './dto/telefone.dto';

@Controller('telefone')
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
  */
}
