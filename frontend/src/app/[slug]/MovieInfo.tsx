import Image from "next/image";
import styles from "./page.module.scss";
import { BsStarFill, BsStar } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

function populateStars(stars: number) {
  function repeatIcon(times: number, iconFactory: (i: number) => JSX.Element) {
    return Array.from({ length: times }, (_, i) => iconFactory(i));
  }

  const filledStars = Math.round(stars / 2);

  return (
    <>
      {repeatIcon(filledStars, (i) => (
        <BsStarFill key={i} />
      ))}
      {repeatIcon(5 - filledStars, (i) => (
        <BsStar key={i} />
      ))}
    </>
  );
}

interface MovieInfoProps {
  movie?: any;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className={styles.container}>
      <div>
        <h3>{movie?.title || <Skeleton width="10rem" />}</h3>
        <p>{movie?.plot || <Skeleton count={5} width="40rem" />}</p>
        <div className={styles.movieAttributes}>
          <div>
            <span>{movie ? "Actors" : <Skeleton width="3rem" />}</span>
            <span>
              {movie?.actors.join(", ") || <Skeleton width="15rem" />}
            </span>
          </div>
          <div>
            <span>{movie ? "Review" : <Skeleton width="3rem" />}</span>
            <span>
              {movie ? populateStars(movie.review) : <Skeleton width="15rem" />}
            </span>
          </div>
        </div>
      </div>
      {movie ? (
        <Image
          src={movie.posterUrl}
          alt="Movie Poster"
          width={300}
          height={420}
        />
      ) : (
        <Skeleton width={300} height={420} />
      )}
    </div>
  );
}
