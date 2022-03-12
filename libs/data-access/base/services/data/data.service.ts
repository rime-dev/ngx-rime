import {Inject, Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ENTITY_CONFIG} from '../../constants/base.constant';
import {StateEntityConfig} from '../../models/base.model';

/**
 * A data service to use as global data management service.
 * It allows to get entity subject and call methods to interact with Firebase.
 *
 * @example
 * ```
 * \@Component({
 *   selector: 'app-products',
 *   templateUrl: './products.component.html',
 *   styleUrls: ['./products.component.scss'],
 * })
 * export class ProductsComponent {
 *   public products$: Observable<any>;
 *   constructor(private dataService: DataService) {
 *     this.products$ = this.dataService.select('Product').entities$;
 *     this.dataService.select('Product').getAll();
 *   }
 * }
 * ```
 */
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
        this.entitiesInstaces[key] = new EntityCollectionServiceBase(key, serviceElementsFactory);
      }
    }
  }
  select(entityName: string): EntityCollectionServiceBase<any> {
    return this.entitiesInstaces[entityName];
  }
}
