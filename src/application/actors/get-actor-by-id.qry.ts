import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetActorByIdQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  execute(id: string): Observable<Actor> {
    return this.actorRepository.getActorById(id);
  }
}
