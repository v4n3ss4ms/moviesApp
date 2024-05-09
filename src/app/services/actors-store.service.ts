import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActorDto } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class ActorsStoreService {
  private actorsSubject = new BehaviorSubject<Partial<ActorDto>[]>([]);
  readonly actors$ = this.actorsSubject.asObservable();

  getActors() {
    return this.actorsSubject.value;
  }

  setActors(actors: ActorDto[]) {
    this.actorsSubject.next(actors);
  }

  addActor(actor: ActorDto) {
    const actors = this.actorsSubject.getValue();
    this.actorsSubject.next([...actors, actor]);
  }
}
