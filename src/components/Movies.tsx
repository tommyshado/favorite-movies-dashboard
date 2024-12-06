import { DisplayMovies } from "./DisplayMovies";
import { FindMovies } from "./FindMovies";
import { useState } from "react";
import { IMovies } from "./types/IMovies";
import { Container, Row, Col } from "react-bootstrap";

export function Movies() {
  const [movies, setMovies] = useState<IMovies[]>([]);
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