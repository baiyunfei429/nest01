import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsController } from './cats/cats.controller.js';
import { PersonModule } from './person/person.module.js';
import { CccModule } from './ccc/ccc.module.js';
import { LogMiddleware } from './log.middleware.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'nest01',
    // }),
    PersonModule,
    CccModule],
  controllers: [AppController, CatsController],
  providers: [AppService,
    {
      provide: 'person1',
      useValue: {
        name: 'baiyunfei429-2',
        age: 34,
      }
    },
    {
      provide: 'person3',
      useFactory(person1: { name: string }, appService: AppService) {
        return {
          name: person1.name,
          desc: appService.getHello()
        }
      },
      inject: ['person1', AppService]
    },
    {
      provide: 'person4',
      useFactory(person1: { name: string }, appService: AppService) {
        return {
          name: person1.name,
          desc: appService.getHello()
        }
      },
      inject: ['person1', AppService]
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa');
  }
}
