import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actor } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class ActorsStoreService {
  private actorsSubject = new BehaviorSubject<Partial<Actor>[]>([]);
  readonly actors$ = this.actorsSubject.asObservable();

  getActors() {
    return this.actorsSubject.value;
  }

  setActors(actors: Actor[]) {
    this.actorsSubject.next(actors);
  }

  addActor(actor: Actor) {
    const actors = this.actorsSubject.getValue();
    this.actorsSubject.next([...actors, actor]);
  }
}
