import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CacheModule } from '@nestjs/cache-manager';
import {
  AggregatedMovieRepository,
  OmdbApiMovieRepository,
  CachedMovieRepository,
  MovieRepository,
} from './movie.repository';
import { OmdbModule } from '../omdb/omdbapi.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import omdbConfig from './config/omdb.config';

@Module({
  imports: [
    CacheModule.register(),
    OmdbModule.registerAsync({
      imports: [ConfigModule.forFeature(omdbConfig)],
      inject: [omdbConfig.KEY],
      useFactory: ({ apiKey }: ConfigType<typeof omdbConfig>) => ({
        apiKey,
      }),
    }),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: MovieRepository,
      useClass: AggregatedMovieRepository,
    },
    OmdbApiMovieRepository,
    CachedMovieRepository,
  ],
})
export class MoviesModule {}
