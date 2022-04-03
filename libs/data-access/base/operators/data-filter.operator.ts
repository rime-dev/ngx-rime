import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {arrayFilter, ConditionalQueryFirestore, RimeEntityState} from '../models/base.model';

export const dataFilter =
  (query: ConditionalQueryFirestore | ConditionalQueryFirestore[]) =>
  <T>(source: Observable<RimeEntityState<any>[]>) => {
    if (
      (query as ConditionalQueryFirestore[]).length &&
      (query as ConditionalQueryFirestore[]).length > 0
    ) {
      (query as ConditionalQueryFirestore[]).map(
        (eachQuery) => (source = source.pipe(map((documents) => arrayFilter(documents, eachQuery))))
      );
    } else {
      source = source.pipe(
        map((documents) => arrayFilter(documents, query as ConditionalQueryFirestore))
      );
    }
    return source;
  };
