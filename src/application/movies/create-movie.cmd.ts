import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { MovieDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class CreateMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(movie: Partial<MovieDto>): Promise<MovieDto> {
    return await this.movieRepository.create(movie)
  }
}
