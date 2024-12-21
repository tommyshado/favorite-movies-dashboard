import { Card, Row, Col, Button } from 'react-bootstrap';
import { IMovie } from './types/IMovie';
import { MoviesApi } from '../api/MoviesApi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export function DisplayMovies({ moviesList }: { moviesList: IMovie[] }) {
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  const fetchFavorites = async () => {
    try {
      const favorites = await MoviesApi.getFavorites(1);
      const favoriteMovies = Array.isArray(favorites)
        ? favorites
        : favorites.results || [];

      setFavorites(favoriteMovies);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  const isFavorite = (movie: IMovie) => {
    return favorites.some((fav) => fav.id === movie.id);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h3 className="text-center my-4">Searched Movies</h3>
      <Row className='justify-content-center flex-wrap'>
        {moviesList.length > 0 ? (
          moviesList.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    {movie.overview.length > 100
                      ? movie.overview.substring(0, 100) + '...'
                      : movie.overview}
                  </Card.Text>
                </Card.Body>

                <Button
                  onClick={() => {
                    MoviesApi.addToFavorites(1, movie);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'grey',
                  }}
                >
                  {isFavorite(movie) ? <FaHeart /> : <FaRegHeart />}
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No movies found</p>
          </Col>
        )}
      </Row>
    </div>
  );
}