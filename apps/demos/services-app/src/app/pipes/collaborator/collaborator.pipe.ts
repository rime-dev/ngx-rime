import {Pipe, PipeTransform} from '@angular/core';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {User} from '../../models/user.model';

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
