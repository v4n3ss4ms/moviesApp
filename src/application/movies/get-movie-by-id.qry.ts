import { Injectable } from '@angular/core';
import { MovieLocalRepository } from '../../repositories';
import { Movie } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetMovieByIdQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  execute(id: string): Observable<Movie> {
    return this.movieRepository.getMovieById(id)
  }
}
