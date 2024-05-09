import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetActorsCollectionQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(page: string, filter?: { name: string }): Promise<Actor[]> {
    return await this.actorRepository.getAll(page, filter);
  }
}
