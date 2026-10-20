import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// export const Ccc = Reflector.createDecorator<string[]>();
export const Ccc = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        console.log('ccc-decorator:', data, ctx);
        return 'ccc';
    }
);

