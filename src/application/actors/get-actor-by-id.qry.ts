import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetActorByIdQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(id: string): Promise<Actor> {
    return await this.actorRepository.getActorById(id);
  }
}
