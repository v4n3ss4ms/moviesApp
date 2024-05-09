import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { ActorDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetActorByIdQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(id: string): Promise<ActorDto> {
    return await this.actorRepository.getActorById(id);
  }
}
