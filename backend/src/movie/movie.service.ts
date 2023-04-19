import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  findOne(id: string) {
    return this.movieRepository.findByTitle(id);
  }
}
