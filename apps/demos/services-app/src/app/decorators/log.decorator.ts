import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Logs the observable value
 *
 * @param target Observable target
 * @param propertyKey Observable key
 * @example @log$ posts$ : Observable<Post[]>;
 */
export const log$ = (target: any, propertyKey: string) => {
  let propertyValue: any;

  const getter = () => propertyValue;

  const setter = (value: any) => {
    if (value instanceof Observable) {
      propertyValue = value.pipe(
        tap({
          next: (res: any[]) => {
            const isArrayOfObjects = Array.isArray(res) && typeof res[0] === 'object';
            const logType = isArrayOfObjects ? 'table' : 'log';
            console.groupCollapsed(propertyKey);
            // eslint-disable-next-line no-console
            console[logType](res);
            console.groupEnd();
          },
        })
      );
    } else {
      propertyValue = value;
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
};
