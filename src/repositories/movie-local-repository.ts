import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Movie, MovieRepository } from 'src/domain';

const MOVIES_API_URL = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieLocalRepository implements MovieRepository {
  constructor(private http: HttpClient) {}

  getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]> {
    let url = MOVIES_API_URL;
    Object.entries(filter)
      .filter(([key, value]) => !!value)
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
    return firstValueFrom(this.http.get(url)) as any;
  }

  getSingle(id: string): Promise<Movie> {
    return firstValueFrom(this.http.get(`${MOVIES_API_URL}/${id}`)) as any;
  }

  create(movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(this.http.post(MOVIES_API_URL, movie)) as any;
  }

  edit(id: string, movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(
      this.http.patch(`${MOVIES_API_URL}/${id}`, movie)
    ) as any;
  }

  delete(id: string): Promise<Movie> {
    return firstValueFrom(this.http.delete(`${MOVIES_API_URL}/${id}`)) as any;
  }
}
