import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Actor, ActorRepository } from '../domain';

const ACTORS_API_URL = 'http://localhost:3000/actors';

@Injectable({
  providedIn: 'root',
})
export class ActorLocalRepository implements ActorRepository {
  constructor(private http: HttpClient) {
  }

  async getAll(page: string, filter?: { name: string }): Promise<Actor[]> {
    const params = new HttpParams().set('page', page);
    let url = ACTORS_API_URL;
    if (filter?.name) {
      url += `?name_like=${filter.name}`;
    }
    return await firstValueFrom(this.http.get<Actor[]>(url, { params }));
  }

  async getActorById(id: string): Promise<Actor> {
    return await firstValueFrom(this.http.get<Actor>(`${ACTORS_API_URL}/${id}`));
  }

  async create(actor: Partial<Actor>): Promise<Actor> {
    return await firstValueFrom(this.http.post<Actor>(ACTORS_API_URL, actor));
  }
}
