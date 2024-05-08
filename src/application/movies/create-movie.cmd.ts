import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  execute(movie: Partial<Movie>): Observable<Movie> {
    return this.movieRepository.create(movie)
  }
}
