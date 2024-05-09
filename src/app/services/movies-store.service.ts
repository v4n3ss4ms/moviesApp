import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieDto } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class MoviesStoreService {
  private moviesSubject = new BehaviorSubject<Partial<MovieDto>[]>([]);
  readonly movies$ = this.moviesSubject.asObservable();

  getMovies() {
    return this.moviesSubject.value;
  }

  setMovies(movies: MovieDto[]) {
    this.moviesSubject.next(movies);
  }

  addMovie(movie: MovieDto) {
    const movies = this.moviesSubject.getValue();
    this.moviesSubject.next([...movies, movie]);
  }

  deleteMovie(id: string) {
    const movies = this.moviesSubject.getValue();
    const updatedMovies = movies.filter((movie) => movie.id != id);
    this.moviesSubject.next(updatedMovies);
  }

  editMovie(id: string, movie: MovieDto) {
    const movies = this.moviesSubject.getValue();
    const updatedMovies = movies.map((m) => {
      if (m.id === id) {
        return {...m, movie};
      }
      return m;
    });
    this.moviesSubject.next(updatedMovies);
  }
}
