import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {
  DataServiceError,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpMethods,
  QueryParams,
  RequestData,
} from '@ngrx/data';
import {Update} from '@ngrx/entity';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, map, timeout} from 'rxjs/operators';
import {entityConfig} from '../base.module';
export const ENTITY_NAME = new InjectionToken<string>('entityName');
export class FireDataObject {
  public id: string;
  public data: Record<string, any>;
  constructor(data: Record<string, any>) {
    this.id = data.payload.doc.id;
    this.data = data.payload.doc.data();
  }
}

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
@Injectable({providedIn: 'root'})
export class FireDataService<T> implements EntityCollectionDataService<T> {
  protected _name!: string;
  protected delete404OK!: boolean;
  protected entityName!: string;
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
    protected http: HttpClient,
    private angularFirestore: AngularFirestore,
    private config?: DefaultDataServiceConfig
  ) {
    console.log('entityName: ' + entityName);
    this._name = `${entityName} FireDataService`;
    this.entityName = entityName;
    const {
      root = 'api',
      delete404OK = true,
      getDelay = 0,
      saveDelay = 0,
      timeout: to = 0,
    } = this.config || {};
    this.delete404OK = delete404OK;
    this.getDelay = getDelay;
    this.saveDelay = saveDelay;
    this.timeout = to;
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
    console.log('TASKS');
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
        result$ = this.http.delete(url, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      case 'GET': {
        const plurals: Record<string, string> = entityConfig.pluralNames;
        const collection = plurals[this.entityName].toLowerCase();
        console.log('GET:' + collection);
        result$ = this.angularFirestore
          .collection(collection)
          .snapshotChanges()
          .pipe(map((data0) => data0.map((object) => new FireDataObject(object)))); // this.http.get(url, options);
        if (this.getDelay) {
          result$ = result$.pipe(delay(this.getDelay));
        }
        break;
      }
      case 'POST': {
        result$ = of(
          new HttpResponse({status: 200, body: data})
        ) as unknown as Observable<ArrayBuffer>;
        // this.http.post(url, data, options); // of(data); // this.http.post(url, data, options);
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      }
      // N.B.: It must return an Update<T>
      case 'PUT': {
        result$ = of(data); // this.http.put(url, data, options);
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

/**
 * Create a basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
@Injectable()
export class FireDataServiceFactory {
  constructor(
    protected http: HttpClient,
    // protected httpUrlGenerator: HttpUrlGenerator,
    private angularFirestore: AngularFirestore,
    @Optional() protected config?: DefaultDataServiceConfig
  ) {
    config = config || {};
    //httpUrlGenerator.registerHttpResourceUrls(config.entityHttpResourceUrls);
  }

  /**
   * Create a default {EntityCollectionDataService} for the given entity type
   *
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string): EntityCollectionDataService<T> {
    console.log('FACTORY', entityName);
    return new FireDataService<T>(
      entityName,
      this.http,
      //this.httpUrlGenerator,
      this.angularFirestore,
      this.config
    );
  }
}
