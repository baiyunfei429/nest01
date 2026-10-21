import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface DddModuleOptions {
    aaa: number;
    bbb: string;
}

export const {ConfigurableModuleClass, MODULE_OPTIONS_TOKEN} = new ConfigurableModuleBuilder<DddModuleOptions>().build();