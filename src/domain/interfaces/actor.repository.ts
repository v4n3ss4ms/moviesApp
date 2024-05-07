import { Actor } from '../dtos';

export abstract class ActorRepository {
  abstract getAll(page: string, filter?: { name: string }): Promise<Actor[]>;

  abstract getActorById(id: string): Promise<Actor>;

  abstract create(actor: Partial<Actor>): Promise<Actor>;
}
