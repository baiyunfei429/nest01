import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
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
  getAaa(): string {
    console.log('get aaa');
    return 'aaa';
  }
}
