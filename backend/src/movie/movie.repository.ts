import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  GatewayTimeoutException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MovieDto } from './dto/movie.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { OmdbApi } from '../omdb/omdbapi.api';

export abstract class MovieRepository {
  abstract findByTitle(title: string): Promise<MovieDto>;
}

@Injectable()
export class OmdbApiMovieRepository implements MovieRepository {
  constructor(private readonly omdbApi: OmdbApi) {}

  async findByTitle(title: string) {
    const { data } = await firstValueFrom(
      this.omdbApi.movieByIdOrTitle({ t: title, type: 'movie' }).pipe(
        catchError((error: AxiosError) => {
          if (error.response) {
            if (error.status >= 500) {
              throw new ServiceUnavailableException();
            }

            if (error.status === 404) {
              throw new NotFoundException();
            }
          } else if (error.request) {
            throw new GatewayTimeoutException();
          }

          throw error;
        }),
      ),
    );

    if (data.Response === 'False') {
      throw new NotFoundException();
    }

    return {
      title: data.Title,
      plot: data.Plot,
      actors: data.Actors.split(', '),
      review: parseFloat(data.imdbRating),
      posterUrl: data.Poster,
    };
  }
}

@Injectable()
export class CachedMovieRepository implements MovieRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set(id: string, movie: MovieDto) {
    return this.cacheManager.set(`movie:${id}`, movie);
  }

  findByTitle(title: string) {
    return this.cacheManager.get<MovieDto>(`movie:${title}`);
  }
}

@Injectable()
export class AggregatedMovieRepository implements MovieRepository {
  private readonly logger = new Logger(AggregatedMovieRepository.name);

  constructor(
    private readonly apiMovieRepository: OmdbApiMovieRepository,
    private readonly cachedMovieRepository: CachedMovieRepository,
  ) {}

  async findByTitle(title: string) {
    let movie = await this.cachedMovieRepository.findByTitle(title);
    if (!movie) {
      this.logger.debug(
        `movie '${title}' not found in cache, searching and caching...`,
      );

      movie = await this.apiMovieRepository.findByTitle(title);
      await this.cachedMovieRepository.set(title, movie);
    } else {
      this.logger.debug(`movie '${title}' found in cache`);
    }

    return movie;
  }
}
