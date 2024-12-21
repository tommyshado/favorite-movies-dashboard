import { Button, Card, Col, Row } from 'react-bootstrap';
import { IMovie } from './types/IMovie';
import { useState, useEffect } from 'react';
import { MoviesApi } from '../api/MoviesApi';
import { FaHeart } from 'react-icons/fa';

export function DisplayFavorites() {
    // Add state for storing the favorite movies
    const [movies, setMovies] = useState<IMovie[]>([]);

    // Call the api for fetching the favorite movies

    useEffect(() => {
        async function fetchFavorites() {
            try {
                // Find the userId from the local storage
                const favorites = await MoviesApi.getFavorites(1);
                // Ensure favorites is an array
                const favoriteMovies = Array.isArray(favorites) 
                    ? favorites 
                    : favorites.results || []; // Handling different possible response structures

                setMovies(favoriteMovies);
                
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setMovies([]); // Set to empty array in case of error
            }
        }

        fetchFavorites();
    }, []);

    return (
        <div>
        <h2 className="text-center my-4">Favorite Movies</h2>
        <Row className='justify-content-center flex-wrap'>
            {movies.length > 0 ? (
            movies.map((movie) => (
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
                        MoviesApi.removeFromFavorites(1, movie.id);
                        setMovies(movies.filter((m) => m.id !== movie.id));
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'red',
                    }}
                    >
                    {<FaHeart />}
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