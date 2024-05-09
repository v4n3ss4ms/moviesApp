import { MovieDto, MovieFiltersDto } from '../dtos';

export abstract class MovieRepository {
  abstract getAll(
    page: string,
    filter: MovieFiltersDto
  ): Promise<MovieDto[]>;

  abstract getMovieById(id: string): Promise<MovieDto>;
  abstract create(movie: Partial<MovieDto>): Promise<MovieDto>;
  abstract edit(id: string, movie: Partial<MovieDto>): Promise<MovieDto>;
  abstract delete(id: string): Promise<MovieDto>;
}
