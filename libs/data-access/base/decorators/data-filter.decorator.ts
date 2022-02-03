import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConditionalQueryFirestore} from '../models/base.model';

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

export const DataFilter =
  (query: ConditionalQueryFirestore | ConditionalQueryFirestore[]): any =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let propertyValue: any;
    const getter = () => propertyValue;
    const setter = (value: any) => {
      if (
        (query as ConditionalQueryFirestore[]).length &&
        (query as ConditionalQueryFirestore[]).length > 0
      ) {
        if (value instanceof Observable) {
          propertyValue = value;
          (query as ConditionalQueryFirestore[]).map(
            (eachQuery) =>
              (propertyValue = propertyValue.pipe(
                map((documents: any) =>
                  arrayFilter(documents, eachQuery as ConditionalQueryFirestore)
                )
              ))
          );
        } else {
          propertyValue = value;
          (query as ConditionalQueryFirestore[]).map(
            (eachQuery) =>
              (propertyValue = arrayFilter(propertyValue, eachQuery as ConditionalQueryFirestore))
          );
        }
      } else {
        if (value instanceof Observable) {
          propertyValue = value.pipe(
            map((documents: any) => arrayFilter(documents, query as ConditionalQueryFirestore))
          );
        } else {
          propertyValue = arrayFilter(value, query as ConditionalQueryFirestore);
        }
      }
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
