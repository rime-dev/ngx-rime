import {Pipe, PipeTransform} from '@angular/core';
import {User} from '@rng/data-access/auth';
import {EntityState} from '@rng/data-access/base/models/base.model';

@Pipe({
  name: 'collaboratorPipe',
})
export class CollaboratorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): EntityState<User> {
    const collaborators = args[0] as EntityState<User>[];
    const result = collaborators.filter((collaborator) => collaborator.id === value)[0];
    return result;
  }
}
