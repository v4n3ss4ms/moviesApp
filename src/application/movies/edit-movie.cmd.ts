import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  execute(id: string, movie: Partial<Movie>): Observable<Movie> {
    return this.movieRepository.edit(id, movie)
  }
}
