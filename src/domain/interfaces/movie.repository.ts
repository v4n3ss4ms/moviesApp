import { Movie } from '../dtos';

export abstract class MovieRepository {
  abstract getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]>;

  abstract getMovieById(id: string): Promise<Movie>;
  abstract create(movie: Partial<Movie>): Promise<Movie>;
  abstract edit(id: string, movie: Partial<Movie>): Promise<Movie>;
  abstract delete(id: string): Promise<Movie>;
}
