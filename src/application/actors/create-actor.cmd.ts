import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { ActorDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class CreateActorCmd {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(actor: Partial<ActorDto>): Promise<ActorDto> {
    return await this.actorRepository.create(actor);
  }
}
