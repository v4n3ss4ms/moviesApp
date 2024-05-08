import { Observable } from 'rxjs';
import { Movie } from 'src/domain';
import { MovieLocalRepository } from '../../repositories';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GetMoviesCollectionQry {
  constructor(private movieRepository: MovieLocalRepository) {}

  execute(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Observable<Movie[]> {
    return this.movieRepository.getAll(page, filter);
  }
}
