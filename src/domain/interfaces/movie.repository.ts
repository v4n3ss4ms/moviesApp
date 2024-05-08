import { Movie } from '../dtos';
import { Observable } from 'rxjs';

export abstract class MovieRepository {
  abstract getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Observable<Movie[]>;

  abstract getMovieById(id: string): Observable<Movie>;
  abstract create(movie: Partial<Movie>): Observable<Movie>;
  abstract edit(id: string, movie: Partial<Movie>): Observable<Movie>;
  abstract delete(id: string): Observable<Movie>;
}
