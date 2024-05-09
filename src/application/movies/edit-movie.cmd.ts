import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { MovieDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class EditMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  async execute(id: string, movie: Partial<MovieDto>): Promise<MovieDto> {
    return await this.movieRepository.edit(id, movie)
  }
}
