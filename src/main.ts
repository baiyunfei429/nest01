import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { NestExpressApplication } from "@nestjs/platform-express";
import { NextFunction } from 'express';
import { TestFilter } from './test.filter.js';
import session from 'express-session';
// import { TimeInterceptor } from './time.interceptor.js';
// import { LoginGuard } from './login.guard.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // instrument: ObserveInstrument,
  });
  app.useStaticAssets('public', { prefix: '/static' });
  app.setBaseViewsDir('views')
  app.setViewEngine('hbs');
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before-mid-global', req.url);
    next();
    console.log('after-mid-global');
  })
  app.use(session({
    secret: 'bai',
    cookie: { maxAge: 100000 }
  }))
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
  // app.useGlobalInterceptors(new TimeInterceptor());
  // app.useGlobalGuards(new LoginGuard());
  // app.useGlobalFilters(new TestFilter());;
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
