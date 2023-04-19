import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import {
  OmdbApiByIdOrTitleRequestQuery,
  OmdbApiByIdOrTitleResponse,
  OmdbApiBySearchRequestQuery,
  OmdbApiBySearchResponse,
} from './interfaces/omdbapi.interface';
import { MODULE_OPTIONS_TOKEN } from './omdb.module-definition';
import { OmdbModuleOptions } from './interfaces/omdb-module-options.interface';

@Injectable()
export class OmdbApi {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: OmdbModuleOptions,
    private readonly httpService: HttpService,
  ) {}

  movieByIdOrTitle(query: OmdbApiByIdOrTitleRequestQuery) {
    return this.httpService.get<OmdbApiByIdOrTitleResponse>(
      `http://www.omdbapi.com/`,
      {
        params: {
          apikey: this.options.apiKey,
          ...query,
        },
      },
    );
  }

  movieBySearch(query: OmdbApiBySearchRequestQuery) {
    return this.httpService.get<OmdbApiBySearchResponse>(
      `http://www.omdbapi.com/`,
      {
        params: {
          apikey: this.options.apiKey,
          ...query,
        },
      },
    );
  }
}
