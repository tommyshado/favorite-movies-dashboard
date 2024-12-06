import { Card, Row, Col } from 'react-bootstrap';

export interface IMovies {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

export function DisplayMovies({ moviesList }: { moviesList: IMovies[] }) {
  return (
    <div>
      <h1 className="text-center my-4">Searched Movies</h1>
      <Row>
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
