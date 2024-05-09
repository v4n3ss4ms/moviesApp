import { ActorDto, ActorFiltersDto } from '../dtos';

export abstract class ActorRepository {
  abstract getAll(page: string, filter?: ActorFiltersDto): Promise<ActorDto[]>;

  abstract getActorById(id: string): Promise<ActorDto>;

  abstract create(actor: Partial<ActorDto>): Promise<ActorDto>;
}
