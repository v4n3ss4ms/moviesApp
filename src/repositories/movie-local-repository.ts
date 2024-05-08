import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieRepository } from 'src/domain';

const MOVIES_API_URL = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieLocalRepository implements MovieRepository {
  constructor(private http: HttpClient) {
  }

  getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Observable<Movie[]> {
    const params = new HttpParams().set('page', page);
    let url = MOVIES_API_URL;
    Object.entries(filter)
      .filter(([_, value]) => !!value)
      .forEach(([key, value], index) => {
        const prefix = index === 0 ? '?' : '&';
        switch (key) {
          case 'title':
            url += `${prefix}title_like=${value}`;
            break;
          case 'year':
            url += `${prefix}year=${value}`;
            break;
          case 'rate':
            url += `${prefix}rate=${value}`;
            break;
        }
      });
    return this.http.get<Movie[]>(url, { params });
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${MOVIES_API_URL}/${id}`);
  }

  create(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(MOVIES_API_URL, movie);
  }

  edit(id: string, movie: Partial<Movie>): Observable<Movie> {
    return this.http.patch<Movie>(`${MOVIES_API_URL}/${id}`, movie);
  }

  delete(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${MOVIES_API_URL}/${id}`);
  }
}
