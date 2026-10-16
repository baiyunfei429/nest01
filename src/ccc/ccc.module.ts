import { BeforeApplicationShutdown, Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { CccService } from './ccc.service.js';
import { CccController } from './ccc.controller.js';
import { ModuleRef } from '@nestjs/core';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule implements OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown{
  constructor(private moduleRef: ModuleRef) {

  }
  onModuleDestroy() {
    console.log('CccModule OnModuleDestroy')
  }
  beforeApplicationShutdown() {
    console.log('CccModule BeforeApplicationShutdown')
  }
  onApplicationShutdown() {
    const ccsService = this.moduleRef.get<CccService>(CccService)
    console.log('====bai====', ccsService.findAll());
    console.log('CccModule OnApplicationShutdown')
  }
}
