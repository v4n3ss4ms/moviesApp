import { Movie } from '../dtos';

export abstract class ActorRepository {
  abstract getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]>;

  abstract getSingle(id: string): Promise<Movie>;
  abstract create(movie: Partial<Movie>): Promise<Movie>;
  abstract edit(id: string, movie: Partial<Movie>): Promise<Movie>;
  abstract delete(id: string): Promise<Movie>;
}
