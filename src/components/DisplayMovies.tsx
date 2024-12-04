import { IMovies } from "./types/IMovies";

export function DisplayMovies({ moviesList }: { moviesList: IMovies[] }) {
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {moviesList.length > 0 ? (
          moviesList.map((movie) => <li key={movie.id}>{movie.title}</li>)
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
}
