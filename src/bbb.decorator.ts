import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Aaa } from './aaa.decorator.js';
import { AaaGuard } from './aaa.guard.js';

export const Bbb = (path: string, role: string) => {
    return applyDecorators(
        Get(path),
        Aaa(role),
        UseGuards(AaaGuard),
    )
};
