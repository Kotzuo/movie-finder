## Movie Finder

This project is my personal effort to study and understand the new version 13 of Next.js

## Folder Structure

```
/.vscode  <- vscode specific
/backend  <- backend project built using Nest.js
  /src
    /movie <- movie module
      movie.repository.ts <- check session Movie Repository Caching
    /omdb  <- OMDB module
  /test   <- simple e2e test
  .env    <- you need to create one and populate it with omdbapi key
  .default.env <- sample .env
/frontend <- frontend project using Next.js 13
```

## How to run

If you are in vscode you will find a .vscode/launch.json on the root, use it to launch the backend

## Understanding Backend Project

This backend is a simple api built with Nest.js, it has 2 modules, one for the movie that is where the request will be made and an omdb module which is an abstraction of omdbapi

### Env

In order to request omdbapi is necessary to give an `apiKey`, just populate it on the `/backend/.env` and you are good to go, to understand the .env schema simply look up to `.example.env`

### Movie Repository Caching

#### Structure

if you opened the `/backend/src/movie/movie.repository.ts` you will notice that is not the usual day to day simplest repository, instead you will find 3 repositories, the `OmdbApiMovieRepository`, `CachedMovieRepository` and `AggregatedMovieRepository`, all of then implements the abstract class `MovieRepository`, the `AggregatedMovieRepository` is the one that is injected with the `MovieRepository` token injection, this repository has 2 dependecies that is `OmdbApiMovieRepository`, `CachedMovieRepository`.

#### How does it works

The way it works is that it will first find the movie title into the cache, if it does not exists it will fetch from the OmdbApi, this was made to give a better latency since this system is read-only and read-heavy

## Understanding Frontend Project

This frontend project was built using the new Next.js 13

### Env

`.env.local` file here is optional, if it does not exists it will use the default values, the only variable currently used is `NEXT_PUBLIC_MOVIE_API_URL` to indicate the url for the backend

### Pages

This project has only 2 pages, which are:

- `/`
- `/[slug]`

The `/` route simply renders all the necessary components for home page, it is built all using only the `layout.tsx` since all content is reused on the child segment, the page is a server component and the `SearchBar` is the only client component it has to search for movies, when a movie is search it redirects to `/[slug]`, using this architecture allows Next.js to cache all pages, and since the movie data does not change very often it will have a reduced latency next time that is requested giving a good performance boost.

The `/[slug]` is specificaly built for the movie detail to show up and it is a server component, it has an `loading.tsx` that returns an skeleton, it also has an `error.tsx` to handle requests errors
