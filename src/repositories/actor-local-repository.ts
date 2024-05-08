import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorRepository } from '../domain';

const ACTORS_API_URL = 'http://localhost:3000/actors';

@Injectable({
  providedIn: 'root',
})
export class ActorLocalRepository implements ActorRepository {
  constructor(private http: HttpClient) {
  }

  getAll(page: string, filter?: { name: string }): Observable<Actor[]> {
    const params = new HttpParams().set('page', page);
    let url = ACTORS_API_URL;
    if (filter?.name) {
      url += `?name_like=${filter.name}`;
    }
    return this.http.get<Actor[]>(url, { params });
  }

  getActorById(id: string): Observable<Actor> {
    return this.http.get<Actor>(`${ACTORS_API_URL}/${id}`);
  }

  create(actor: Partial<Actor>): Observable<Actor> {
    return this.http.post<Actor>(ACTORS_API_URL, actor);
  }
}
