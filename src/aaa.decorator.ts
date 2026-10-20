import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// export const Aaa = Reflector.createDecorator<string[]>();
export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

