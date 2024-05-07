import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';

@Injectable({ providedIn: 'root' })
export class CreateMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(movie: Partial<Movie>): Promise<Movie> {
    return await this.movieRepository.create(movie)
  }
}
