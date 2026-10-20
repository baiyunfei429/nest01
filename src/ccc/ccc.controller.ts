import { Controller, Get, Post, Body, Patch, Param, Delete, HostParam, Req, Res, Next, HttpCode, Header, Redirect } from '@nestjs/common';
import { CccService } from './ccc.service.js';
import { CreateCccDto } from './dto/create-ccc.dto.js';
import { UpdateCccDto } from './dto/update-ccc.dto.js';
import type { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'ccc' })
export class CccController {
  constructor(private readonly cccService: CccService) {}

  @Post()
  create(@Body() createCccDto: CreateCccDto) {
    return this.cccService.create(createCccDto);
  }

  @Get()
  findAll() {
    return this.cccService.findAll();
  }

  @Get('req')
  getReq(@Req() req: Request): Record<string, any> {
    console.log('33333');
    console.log(req, req.hostname, req.url);
    return {reqestBai: req.url, hostname: req.hostname};
  }

  @Get('resp')
  getResp(@Res({passthrough: true}) res: Response): Record<string, any> {
    console.log('444', res);
    // res.end('444');
    return {name: 'bai'};
  }

  @Get('next')
  next(@Next() next: NextFunction) {
    console.log('next function');
    next();
    return 'next';
  }

  @Get('next')
  next2(@Next() next: NextFunction) {
    console.log('next2 function');
    return 'next2';
  }

  @Get('httpcode')
  @HttpCode(221)
  @Header('name', 'bai')
  getHttpCode() {
    return 'httpcode';
  }

  @Get('redirect-test')
  @Redirect('https://www.baidu.com')
  redirectTest() {
    return 'redirect';
  }

  @Get('redirect-test2')
  @Redirect()
  redirectTest2() {
    return {
      url: 'https://www.baidu.com?q=bai',
      statusCode: 302,
    };
  }

  @Get('host')
  getHost(@HostParam('host') host: string) {
    return host;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCccDto: UpdateCccDto) {
    return this.cccService.update(+id, updateCccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cccService.remove(+id);
  }
}
