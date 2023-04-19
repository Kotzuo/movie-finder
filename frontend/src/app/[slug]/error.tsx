"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";

interface MoviePageErrorProps {
  error: Error;
  reset: () => void;
}

export default function MoviePageError({ error, reset }: MoviePageErrorProps) {
  useEffect(() => {
    console.dir(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
