import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('pipe 的参数：', value, metadata, Number.isNaN(parseInt(value)));
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}异常`)
    }
    return typeof value === 'number' ? value * 9 : parseInt(value) * 9;
  }
}
