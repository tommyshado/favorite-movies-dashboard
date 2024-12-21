import { IMovie } from "../components/types/IMovie";
import axios from "axios";

const api = "https://favorite-movies-api-cblw.onrender.com/api/favorites";

export class MoviesApi {
  static async addToFavorites(userId: number, movie: IMovie) {
    const results = await axios.post(
      `${api}/${userId}`,
      movie
    );
    return results.data;
  }

  static async getFavorites(userId: number) {
    const results = await axios.get(
      `${api}/${userId}`
    );
    return results.data;
  }

  static async removeFromFavorites(userId: number, movieId: number) {
    const results = await axios.delete(
      `${api}/${userId}/${movieId}`
    );
    return results.data;
  }
}
