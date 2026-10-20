import { Controller, Get, Headers, Inject, Ip, Query, Render, Session, SetMetadata, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service.js';
import { TimeInterceptor } from './time.interceptor.js';
import { ValidatePipe } from './validate.pipe.js';
import { TestFilter } from './test.filter.js';
import { AaaGuard } from './aaa.guard.js';
import { Aaa } from './aaa.decorator.js';
import { Bbb } from './bbb.decorator.js';
import { Ccc } from './ccc.decorator.js';
import { MyHeaders } from './my-headers.decorator.js';
// import { LoginGuard } from './login.guard.js';

@Controller()
@UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
// @UseFilters(TestFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('person1') private readonly person12: {name: string, age: number},
    @Inject('person3') private readonly person3: {name: string, desc: string}
  ) {
  }

  @Get()
  @SetMetadata('aaa', 'admin-bai')
  @UseGuards(AaaGuard)
  getHello(): string {
    console.log(this.person12)
    console.log(this.person3)
    return this.appService.getHello();
  }

  @Get('aaa')
  @Aaa('admin-bai-decorator')
  @UseGuards(AaaGuard)
  @UseInterceptors(TimeInterceptor)
  // @UseGuards(LoginGuard)
  getAaa(): string {
    console.log('get aaa');
    return 'aaa';
  }

  @Bbb('bbb-custom-decorator', 'admin-bbb')
  bbbTest(): string {
    return this.appService.getHello();
  }

  @Get('ccc-params-decorator')
  cccPD(@Ccc('bai-ccc') c: string): string {
    return c;
  }

  @Get('custom-header-decorator')
  headerTest(@Headers('Cookie') cookie1: string, @MyHeaders('cookie') cookie2: string, @MyHeaders('bai') cookie3: string) {
    console.log(cookie1, cookie2, cookie3);
  }

  @Get('ddd')
  @UseFilters(TestFilter)
  // ccc(@Query('num') num: number) {
  ccc(@Query('num', ValidatePipe) num: number,
    @Headers('Accept') accept: string,
    @Headers('Cookie') cookie: string,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
    @Session() session: string,
  ) {
    console.log(typeof(num + 3));
    console.log('headers:', cookie, accept, headers);
    console.log('ip:', ip);
    console.log('session:', session);
    return num + 3;
  }

  @Get('session')
  @UseInterceptors(TimeInterceptor)
  session(@Session() session: Record<string, any>) {
    console.log('session:', session);
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }

  @Get('user')
  @Render('uses')
  user() {
    return {name: 'bai', age: '34'}
  }
}
