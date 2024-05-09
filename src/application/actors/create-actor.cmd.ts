import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { Actor } from '../../domain';

@Injectable({ providedIn: 'root' })
export class CreateActorCmd {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(actor: Partial<Actor>): Promise<Actor> {
    return await this.actorRepository.create(actor);
  }
}
