import { Injectable } from '@angular/core';
import { ActorLocalRepository } from '../../repositories';
import { ActorDto, ActorFiltersDto } from '../../domain';

@Injectable({ providedIn: 'root' })
export class GetActorsCollectionQry {
  constructor(private actorRepository: ActorLocalRepository) {}

  async execute(page: string, filter?: ActorFiltersDto): Promise<ActorDto[]> {
    return await this.actorRepository.getAll(page, filter);
  }
}
