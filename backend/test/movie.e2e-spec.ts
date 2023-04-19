import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../src/movie/movie.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movie/interstellar (GET)', () => {
    return request(app.getHttpServer())
      .get('/movie/interstellar')
      .expect(200)
      .expect({
        title: 'Interstellar',
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        review: 8.6,
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      });
  });
});
