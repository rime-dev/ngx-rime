import {Inject, Injectable, InjectionToken} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {entityConfig} from '../base.module';

// @Injectable({providedIn: 'root'})
// export class DataService extends EntityCollectionServiceBase<any> {
//   constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
//     super('Task', serviceElementsFactory);
//     const plurals: Record<string, string> = entityConfig.pluralNames;
//     for (const key in plurals) {
//       if (Object.prototype.hasOwnProperty.call(plurals, key)) {
//         serviceElementsFactory.create(key);
//       }
//     }
//   }
// }

const ENTITY_NAME = new InjectionToken<string>('entityName');

class DataEntity extends EntityCollectionServiceBase<any> {
  constructor(
    @Inject(ENTITY_NAME) entity: string,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entity, serviceElementsFactory);
  }
}
@Injectable({providedIn: 'root'})
export class DataService {
  entitiesInstaces: Record<string, any> = {};

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    const plurals: Record<string, string> = entityConfig.pluralNames;
    for (const key in plurals) {
      if (Object.prototype.hasOwnProperty.call(plurals, key)) {
        this.entitiesInstaces[key] = new DataEntity(key, serviceElementsFactory);
      }
    }
  }
  select(entityName: string) {
    return this.entitiesInstaces[entityName];
  }
}
