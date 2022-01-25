import {FirebaseOptions} from '@angular/fire/app';
import {FieldPath} from '@angular/fire/compat/firestore';
import {EntityMetadataMap} from '@ngrx/data';
import {Update} from '@ngrx/entity';
import {Observable} from 'rxjs';

export interface EntityState<T> {
  id: string;
  data: any;
}
export interface StateEntityConfig {
  enablePersistence?: boolean;
  entityMetadata: EntityMetadataMap;
  pluralNames: any;
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
    this.id = data.payload.doc.id;
    this.data = data.payload.doc.data();
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
  add(entity: T): Observable<T>;
  delete(id: number | string): Observable<number | string>;
  getAll(): Observable<T[]>;
  getById(id: any): Observable<T>;
  getWithLimit(limit: number): Observable<T[]>;
  update(update: Update<T>): Observable<T>;
  getWithQuery(params: ConditionalQueryFirestore[]): Observable<T[]>;
}
