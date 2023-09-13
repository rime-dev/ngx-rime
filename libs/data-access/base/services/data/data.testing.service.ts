import {Inject, Injectable} from '@angular/core';

import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

import {ENTITY_CONFIG} from '../../constants/base.constant';
import {FireEntityCollectionDataService, RimeStateEntityConfig} from '../../models/base.model';

/**
 * A data service to use as testing service in spec files, used in BaseTestingModule
 */
@Injectable()
export class RimeDataTestingService {
  entitiesInstaces: Record<string, FireEntityCollectionDataService<never>> = {};
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: RimeStateEntityConfig,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    const plurals: Record<string, string> = this.entityConfig.pluralNames;
    for (const key in plurals) {
      if (Object.prototype.hasOwnProperty.call(plurals, key)) {
        this.entitiesInstaces[key] = new EntityCollectionServiceBase(
          key,
          serviceElementsFactory
        ) as unknown as FireEntityCollectionDataService<never>;
      }
    }
  }
  select<T>(entityName: string): FireEntityCollectionDataService<T> {
    return this.entitiesInstaces[entityName] as FireEntityCollectionDataService<T>;
  }
}
