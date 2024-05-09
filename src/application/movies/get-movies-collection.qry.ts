import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie, MovieFilters } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetMoviesCollectionQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(
    page: string,
    filter: MovieFilters,
  ): Promise<Movie[]> {
    return await this.movieRepository.getAll(page, filter)
  }
}
