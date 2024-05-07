import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Movie, MovieRepository } from 'src/domain';

const MOVIES_API_URL = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieLocalRepository implements MovieRepository {
  constructor(private http: HttpClient) {
  }

  async getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]> {
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
    return await firstValueFrom(this.http.get<Movie[]>(url, { params }));
  }

  async getMovieById(id: string): Promise<Movie> {
    return await firstValueFrom(this.http.get<Movie>(`${MOVIES_API_URL}/${id}`));
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    return await firstValueFrom(this.http.post<Movie>(MOVIES_API_URL, movie));
  }

  async edit(id: string, movie: Partial<Movie>): Promise<Movie> {
    return await firstValueFrom(
      this.http.patch<Movie>(`${MOVIES_API_URL}/${id}`, movie)
    );
  }

  async delete(id: string): Promise<Movie> {
    return await firstValueFrom(this.http.delete<Movie>(`${MOVIES_API_URL}/${id}`));
  }
}
