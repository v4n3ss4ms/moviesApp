import { Actor } from '../dtos';
import { Observable } from 'rxjs';

export abstract class ActorRepository {
  abstract getAll(page: string, filter?: { name: string }): Observable<Actor[]>;

  abstract getActorById(id: string): Observable<Actor>;

  abstract create(actor: Partial<Actor>): Observable<Actor>;
}
