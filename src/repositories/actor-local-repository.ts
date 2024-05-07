import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Actor, ActorRepository } from '../domain';

const ACTORS_API_URL = 'http://localhost:3000/actors';

@Injectable({
  providedIn: 'root',
})
export class ActorLocalRepository implements ActorRepository {
  constructor(private http: HttpClient) {}

  getAll(page: string, filter?: { name: string }): Promise<Actor[]> {
    let url = ACTORS_API_URL;
    if (filter?.name) {
      url += `?name_like=${filter.name}`;
    }
    return firstValueFrom(this.http.get(url)) as any;
  }

  getActorById(id: string): Promise<Actor> {
    return firstValueFrom(this.http.get(`${ACTORS_API_URL}/${id}`)) as any;
  }

  create(actor: Partial<Actor>): Promise<Actor> {
    return firstValueFrom(this.http.post(ACTORS_API_URL, actor)) as any;
  }
}
