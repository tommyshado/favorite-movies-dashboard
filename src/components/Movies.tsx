import { DisplayMovies } from "./DisplayMovies";
import { FindMovies } from "./FindMovies";
import { useState } from "react";
import { IMovies } from "./types/IMovies";

export function Movies() {
  const [movies, setMovies] = useState<IMovies[]>([]);
  return (
    <>
      <FindMovies onMoviesReceived={setMovies} />
      <DisplayMovies moviesList={movies} />
    </>
  );
}
