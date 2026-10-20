import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

export const MyHeaders = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        console.log('my-headers-decorator, key:', key, request.headers);
        return key ? request.headers[key.toLowerCase()] : request.headers;
    }
);
