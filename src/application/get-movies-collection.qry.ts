import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../repositories';
import { Movie } from '../domain';

@Injectable({ providedIn: 'root' })
export class GeMoviesCollectionQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]> {
    return await this.movieRepository.getAll(page, filter)
  }
}
