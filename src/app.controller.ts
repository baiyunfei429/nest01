import { Controller, Get, Inject, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service.js';
import { TimeInterceptor } from './time.interceptor.js';
import { ValidatePipe } from './validate.pipe.js';
// import { LoginGuard } from './login.guard.js';

@Controller()
@UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('person1') private readonly person12: {name: string, age: number},
    @Inject('person3') private readonly person3: {name: string, desc: string}
  ) {
  }

  @Get()
  getHello(): string {
    console.log(this.person12)
    console.log(this.person3)
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseInterceptors(TimeInterceptor)
  // @UseGuards(LoginGuard)
  getAaa(): string {
    console.log('get aaa');
    return 'aaa';
  }

  @Get('ddd')
  // ccc(@Query('num') num: number) {
  ccc(@Query('num', ValidatePipe) num: number) {
    console.log(typeof(num + 3));
    return num + 3;
  }
}
