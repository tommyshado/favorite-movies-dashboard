import { DisplayMovies } from "./DisplayMovies";
import { FindMovies } from "./FindMovies";
import { useState } from "react";
import { IMovie } from "./types/IMovie";
import { Container, Row, Col } from "react-bootstrap";

export function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  return (
    <Container className="d-flex flex-column align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <FindMovies onMoviesReceived={setMovies} />
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col xs={12}>
          <DisplayMovies moviesList={movies} />
        </Col>
      </Row>
    </Container>
  );
}