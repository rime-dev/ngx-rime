import {Inject, Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ENTITY_CONFIG} from '../../constants/base.constant';
import {StateEntityConfig} from '../../models/base.model';

/**
 * A data service to use as testing service in spec files, used in BaseTestingModule
 */
@Injectable()
export class DataTestingService {
  entitiesInstaces: Record<string, any> = {};
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: StateEntityConfig,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    const plurals: Record<string, string> = this.entityConfig.pluralNames;
    for (const key in plurals) {
      if (Object.prototype.hasOwnProperty.call(plurals, key)) {
        this.entitiesInstaces[key] = new EntityCollectionServiceBase(key, serviceElementsFactory);
      }
    }
  }
  select(entityName: string): EntityCollectionServiceBase<any> {
    return this.entitiesInstaces[entityName];
  }
}
