import { useEffect, useState } from "react";
import axios from "axios";
import { IMovies } from "./types/IMovies";

export function FindMovies({
  onMoviesReceived,
}: {
  onMoviesReceived: (movies: IMovies[]) => void;
}) {
  const [movie, setMovie] = useState("");
  const [debouncedMovie, setDebouncedMovie] = useState("");

  // Debounce effect for input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMovie(movie);
    }, 500); // Delay in milliseconds

    return () => {
      clearTimeout(handler); // Clear timeout if the user types quickly
    };
  }, [movie]);

  // Fetch movies when the debounced value changes
  const fetchMovies = (query: string) => {
    if (query.trim()) {
      axios
        .get(
          `${process.env.MOVIES_API_KEY}&query=${query}`
        )
        .then((res) => {
          console.log("******************", res.data);
          onMoviesReceived(res.data.results as IMovies[]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Automatically fetch movies when debouncedMovie updates
  useEffect(() => {
    fetchMovies(debouncedMovie);
  }, [debouncedMovie]);

  return (
    <div>
      <h1>Find Movies</h1>
      <input
        type="text"
        placeholder="Search..."
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          fetchMovies(movie); // Fetch movies immediately when the button is clicked
        }}
      >
        Search
      </button>
    </div>
  );
}
