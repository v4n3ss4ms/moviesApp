import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteMovieCmd {
  constructor(private movieRepository: MovieLocalRepository) {}

  execute(id: string): Observable<Movie> {
    return this.movieRepository.delete(id)
  }
}
