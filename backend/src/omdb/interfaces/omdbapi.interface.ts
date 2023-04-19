export interface OmdbApiBySearchResponse {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }>;
  totalResults: string;
  Response: string;
}

export interface OmdbApiByIdOrTitleResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

type OmdbApiByIdOrTitleRequestOptionalQuery = {
  type?: 'movie' | 'series' | 'episode';
  y?: string;
  plot?: 'short' | 'full';
  r?: 'json' | 'xml';
  callback?: string;
  v?: string;
};

export type OmdbApiByIdOrTitleRequestQuery =
  | ({
      i: string;
    } & OmdbApiByIdOrTitleRequestOptionalQuery)
  | ({
      t: string;
    } & OmdbApiByIdOrTitleRequestOptionalQuery);

export interface OmdbApiBySearchRequestQuery {
  s: string;
  type?: OmdbApiByIdOrTitleRequestOptionalQuery['type'];
  y?: string;
  r?: OmdbApiByIdOrTitleRequestOptionalQuery['r'];
  page?: string;
  callback?: string;
  v?: string;
}
