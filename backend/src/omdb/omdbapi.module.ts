import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OmdbApi } from './omdbapi.api';
import { ConfigurableModuleClass } from './omdb.module-definition';

@Module({
  imports: [HttpModule],
  providers: [OmdbApi],
  exports: [OmdbApi],
})
export class OmdbModule extends ConfigurableModuleClass {}
