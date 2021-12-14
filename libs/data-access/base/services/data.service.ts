import {Inject, Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ENTITY_CONFIG, ENTITY_NAME, StateEntityConfig} from '../base.module';

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
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: StateEntityConfig,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    const plurals: Record<string, string> = this.entityConfig.pluralNames;
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
