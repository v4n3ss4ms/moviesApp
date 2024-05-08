import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetActorsCollectionQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  execute(page: string, filter?: { name: string }): Observable<Actor[]> {
    return this.actorRepository.getAll(page, filter);
  }
}
