import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { MovieDto, MovieFiltersDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetMoviesCollectionQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(
    page: string,
    filter: MovieFiltersDto,
  ): Promise<MovieDto[]> {
    return await this.movieRepository.getAll(page, filter)
  }
}
