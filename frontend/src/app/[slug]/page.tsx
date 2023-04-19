import MovieInfo from "./MovieInfo";

interface MoviePageProps {
  params: {
    slug: string;
  };
}

async function getData(id: string) {
  let res;
  try {
    res = await fetch(
      `${
        process.env.NEXT_PUBLIC_MOVIE_API_URL || "http://localhost:3001"
      }/movie/${id}`
    );
  } catch (err) {
    if (err instanceof Error && err.message === "fetch failed") {
      throw new Error("Server offline!");
    }

    throw new Error("Something went wrong!");
  }

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Movie not found!");
    } else if (res.status >= 500) {
      throw new Error("Server error!");
    }

    throw new Error("Something went wrong!");
  }

  return res.json();
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getData(params.slug);

  return <MovieInfo movie={movie} />;
}
