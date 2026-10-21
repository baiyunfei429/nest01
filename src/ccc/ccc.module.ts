import { BeforeApplicationShutdown, Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { CccService } from './ccc.service.js';
import { CccController } from './ccc.controller.js';
import { ModuleRef } from '@nestjs/core';
import { ConfigurableModuleClass } from '../ddd.module-definition.js';

@Module({
  imports:[],
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule extends ConfigurableModuleClass implements OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown{
  constructor(private moduleRef: ModuleRef) {
    super();
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
