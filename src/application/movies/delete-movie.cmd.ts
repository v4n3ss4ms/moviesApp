import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';

@Injectable({ providedIn: 'root' })
export class DeleteMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(id: number): Promise<Movie> {
    return await this.movieRepository.delete(id)
  }
}
