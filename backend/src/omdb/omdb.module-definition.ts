import { ConfigurableModuleBuilder } from '@nestjs/common';
import { OmdbModuleOptions } from './interfaces/omdb-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<OmdbModuleOptions>().build();
