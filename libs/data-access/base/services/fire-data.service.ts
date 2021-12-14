import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {
  DataServiceError,
  EntityCollectionDataService,
  HttpMethods,
  QueryParams,
  RequestData,
} from '@ngrx/data';
import {Update} from '@ngrx/entity';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, map, timeout} from 'rxjs/operators';
import {ENTITY_CONFIG, ENTITY_NAME, StateEntityConfig} from '../base.module';

export class FireDataObject {
  public id: string;
  public data: Record<string, any>;
  constructor(data: Record<string, any>) {
    this.id = data.payload.doc.id;
    this.data = data.payload.doc.data();
  }
}

@Injectable({providedIn: 'root'})
export class FireDataService<T> implements EntityCollectionDataService<T> {
  protected _name!: string;
  protected delete404OK!: boolean;
  protected entityName!: string;
  protected entityConfig!: StateEntityConfig;
  protected entityUrl!: string;
  protected entitiesUrl!: string;
  protected getDelay = 0;
  protected saveDelay = 0;
  protected timeout = 0;

  get name() {
    return this._name;
  }

  constructor(
    @Inject(ENTITY_NAME) entityName: string,
    @Inject(ENTITY_CONFIG) entityConfig: StateEntityConfig,
    private angularFirestore: AngularFirestore
  ) {
    console.log(entityConfig);
    this.entityConfig = entityConfig;
    this._name = `${entityName} FireDataService`;
    this.entityName = entityName;
  }

  add(entity: T): Observable<any> {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
    return of(this.angularFirestore.collection(this.entityName).add(entity));
  }

  delete(key: number | string): Observable<number | string> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }
    return this.execute('DELETE', this.entityUrl + key, err).pipe(
      map((result) => key as number | string)
    );
  }

  getAll(): Observable<any> {
    return this.execute('GET', 'all');
  }

  getById(key: number | string): Observable<T> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', this.entityUrl + key, err);
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    const qParams =
      typeof queryParams === 'string' ? {fromString: queryParams} : {fromObject: queryParams};
    const params = new HttpParams(qParams);
    return this.execute('GET', this.entitiesUrl, undefined, {params});
  }

  update(update: Update<T>): Observable<any> {
    const id = update && update.id;
    const updateOrError =
      id == null ? new Error(`No "${this.entityName}" update data or id`) : update.changes;
    return of(this.angularFirestore.doc(`${this.entityName}/${update.id}`).update(update.changes));
  }

  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entity: T): Observable<T> {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to upsert`);
    return this.execute('POST', this.entityUrl, entityOrError);
  }

  private getCollection(entityName: string) {
    const plurals: Record<string, string> = this.entityConfig.pluralNames;
    const collection = plurals[entityName].toLowerCase();
    return collection;
  }
  protected execute(
    method: HttpMethods,
    url: string,
    data?: any, // data, error, or undefined/null
    options?: any
  ): Observable<any> {
    const req: RequestData = {method, url, data, options};

    if (data instanceof Error) {
      return this.handleError(req)(data);
    }

    let result$: Observable<any>;

    switch (method) {
      case 'DELETE': {
        result$ = of(); // this.http.delete(url, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      case 'GET': {
        result$ = this.angularFirestore
          .collection(this.getCollection(this.entityName))
          .snapshotChanges()
          .pipe(map((data0) => data0.map((object) => new FireDataObject(object)))); // this.http.get(url, options);
        if (this.getDelay) {
          result$ = result$.pipe(delay(this.getDelay));
        }
        break;
      }
      case 'POST': {
        result$ = of(); // this.http.post(url, data, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      // N.B.: It must return an Update<T>
      case 'PUT': {
        result$ = of(); // this.http.put(url, data, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      default: {
        const error = new Error('Unimplemented HTTP method, ' + method);
        result$ = throwError(error);
      }
    }
    if (this.timeout) {
      result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
    }
    return result$.pipe(catchError(this.handleError(req)));
  }

  private handleError(reqData: RequestData) {
    return (err: any) => {
      const ok = this.handleDelete404(err, reqData);
      if (ok) {
        return ok;
      }
      const error = new DataServiceError(err, reqData);

      return throwError(error);
    };
  }

  private handleDelete404(error: HttpErrorResponse, reqData: RequestData) {
    if (error.status === 404 && reqData.method === 'DELETE' && this.delete404OK) {
      return of({});
    }
    return undefined;
  }
}

@Injectable()
export class FireDataServiceFactory {
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: StateEntityConfig,
    private angularFirestore: AngularFirestore
  ) {}
  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new FireDataService<T>(entityName, this.entityConfig, this.angularFirestore);
  }
}
