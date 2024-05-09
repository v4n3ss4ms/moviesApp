import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetMovieByIdQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(id: string): Promise<Movie> {
    return await this.movieRepository.getMovieById(id)
  }
}
