import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { enderecoDto } from './dto/endereco.dto';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  create(@Body() enderecoDto: enderecoDto) {
    return this.enderecoService.create(enderecoDto);
  }

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() enderecoDto: enderecoDto) {
    return this.enderecoService.update(+id, enderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(+id);
  }
}
