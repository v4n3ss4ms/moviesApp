import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class MoviesStoreService {
  private moviesSubject = new BehaviorSubject<Partial<Movie>[]>([]);
  readonly movies$ = this.moviesSubject.asObservable();

  getMovies() {
    return this.moviesSubject.value;
  }

  setMovies(movies: Movie[]) {
    this.moviesSubject.next(movies);
  }

  addMovie(movie: Movie) {
    const movies = this.moviesSubject.getValue();
    this.moviesSubject.next([...movies, movie]);
  }

  deleteMovie(id: string) {
    const movies = this.moviesSubject.getValue();
    const updatedMovies = movies.filter((movie) => movie.id != id);
    this.moviesSubject.next(updatedMovies);
  }

  editMovie(id: string, movie: Movie) {
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
