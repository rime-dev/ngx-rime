import {FirebaseOptions} from '@angular/fire/app';
import {FieldPath} from '@angular/fire/compat/firestore';
import {EntityMetadataMap} from '@ngrx/data';
import {Observable} from 'rxjs';

export type FireEntityCollectionDataServiceBase<T> = FireEntityCollectionDataService<
  // EntityCollectionServiceBase<EntityState<never>> &
  EntityState<T>
>;

export interface EntityState<T> {
  id: string;
  data: T;
}
export interface StateEntityConfig {
  enablePersistence?: boolean;
  entityMetadata: EntityMetadataMap;
  pluralNames: Record<string, string>;
  mockData?: Record<string, any>;
}
export interface FirebaseConfig {
  options: FirebaseOptions;
  entityConfig: StateEntityConfig;
}

export class FireDataObject {
  public id: string;
  public data: Record<string, any>;
  constructor(data: Record<string, any>) {
    this.id = data.payload.id;
    this.data = data.payload.data();
  }
}

export class FireDataMockObject {
  public id: string;
  public data: Record<string, any>;
  constructor(data: Record<string, any>) {
    this.id = data.id;
    this.data = data.data;
  }
}

export type FirebaseMethods = 'delete' | 'set' | 'get' | 'update';

export interface FirebaseData {
  method: FirebaseMethods;
  document?: any;
  data?: any;
}

/**
 * Error from a DataService
 * The source error either comes from a failed HTTP response or was thrown within the service.
 *
 * @param error the HttpErrorResponse or the error thrown by the service
 * @param requestData the HTTP request information such as the method and the url.
 */
export class FireDataServiceError {
  error!: any;
  requestData!: FirebaseData | null;
  message!: string | null;
  constructor(error: any, requestData: FirebaseData | null) {}
}

export interface ConditionalQueryFirestore {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: any;
}

/**
 * Filter conditions in a `Query.where()` clause are specified using the
 * strings '<', '<=', '==', '!=', '>=', '>', 'array-contains', 'in',
 * 'array-contains-any', and 'not-in'.
 */
export type WhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '!='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any'
  | 'not-in';

/**
 * The direction of a `Query.orderBy()` clause is specified as 'desc' or 'asc'
 * (descending or ascending).
 */
export type OrderByDirection = 'desc' | 'asc';

/** A service that performs FIREBASE-like CRUD data operations for an entity collection */
export interface FireEntityCollectionDataService<T> {
  entities$: Observable<EntityState<T>[]>;
  add(entity: T): Observable<T>;
  delete(id: number | string): Observable<number | string>;
  getAll(): Observable<T[]>;
  getById(id: any): Observable<T>;
  getByKey(id: any): Observable<T>;
  getWithLimit(limit: number): Observable<T[]>;
  update(update: EntityState<T>): Observable<T>;
  getWithQuery(params: ConditionalQueryFirestore[]): Observable<T[]>;
}

export const filterOperator = {
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

export const arrayFilter = (array: any[], query: ConditionalQueryFirestore) =>
  array.filter((doc: any) =>
    filterOperator[query.opStr](doc.data[query?.fieldPath as string], query?.value)
  );
