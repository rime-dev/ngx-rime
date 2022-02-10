import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConditionalQueryFirestore, EntityState} from '../models/base.model';

const filterOperator = {
  '<': (data: any, value: any) => data < value,
  '<=': (data: any, value: any) => data <= value,
  '==': (data: any, value: any) => data === value,
  '!=': (data: any, value: any) => data !== value,
  '>=': (data: any, value: any) => data >= value,
  '>': (data: any, value: any) => data > value,
  'array-contains': (data: any[], value: any) => data.includes(value),
  in: () => (data: any, value: any) => data.some(value),
  'array-contains-any': () => null,
  'not-in': (data: any, value: any) => !data.some(value),
};

const arrayFilter = (array: any[], query: ConditionalQueryFirestore) =>
  array.filter((doc: any) =>
    filterOperator[query.opStr](doc.data[query?.fieldPath as string], query?.value)
  );

export const dataFilter =
  (query: ConditionalQueryFirestore | ConditionalQueryFirestore[]) =>
  <T>(source: Observable<EntityState<any>[]>) => {
    if (
      (query as ConditionalQueryFirestore[]).length &&
      (query as ConditionalQueryFirestore[]).length > 0
    ) {
      (query as ConditionalQueryFirestore[]).map(
        (eachQuery) =>
          (source = source.pipe(
            map((documents) => arrayFilter(documents, eachQuery as ConditionalQueryFirestore))
          ))
      );
    } else {
      source = source.pipe(
        map((documents) => arrayFilter(documents, query as ConditionalQueryFirestore))
      );
    }
    return source;
  };
