import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateActorCmd {
  constructor(private actorRepository: ActorLocalRepository) {}

  execute(actor: Partial<Actor>): Observable<Actor> {
    return this.actorRepository.create(actor);
  }
}
