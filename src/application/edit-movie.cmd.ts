import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../repositories';
import { Movie } from '../domain';

@Injectable({ providedIn: 'root' })
export class EditMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(id: number, movie: Partial<Movie>): Promise<Movie> {
    return await this.movieRepository.edit(id, movie)
  }
}
