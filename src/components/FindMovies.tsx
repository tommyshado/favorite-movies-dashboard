import { useEffect, useState } from "react";
import axios from "axios";
import { IMovie } from "./types/IMovie";
import { Button, Form, InputGroup } from "react-bootstrap";

export function FindMovies({
  onMoviesReceived,
}: {
  onMoviesReceived: (movies: IMovie[]) => void;
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
          const data = res.data.results;
          const movies = data.map((movie: any) => {
            return {
              id: movie.id,
              title: movie.title,
              backdrop_path: movie.backdrop_path,
              overview: movie.overview,
              language: movie.original_language,
              release_date: movie.release_date
            };
          })

          onMoviesReceived(movies);
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
    <div className="text-center my-4">
      <h2 className="mb-3">Find Movies</h2>
      <Form onSubmit={(e) => {
        e.preventDefault();
        fetchMovies(movie);
      }}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search for movies..."
            value={movie}
            onChange={(e) => {
              setMovie(e.target.value);
              if (!e.target.value) {
                onMoviesReceived([]);
              }
            }}
          />
          <Button 
            variant="primary" 
            type="submit"
          >
            Search
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
