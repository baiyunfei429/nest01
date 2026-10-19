import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class TestFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const reponse: Response = host.switchToHttp().getResponse();

    reponse.status(400).json({
      statusCode: 400,
      message: 'test-bai:' + exception.message,
    })
  }
}
