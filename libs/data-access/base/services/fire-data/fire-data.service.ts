/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, FieldPath} from '@angular/fire/compat/firestore';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, delay, map, switchMap, timeout} from 'rxjs/operators';

import {ENTITY_CONFIG, ENTITY_NAME} from '../../constants/base.constant';
import {
  ConditionalQueryFirestore,
  FirebaseData,
  FirebaseMethods,
  OrderByDirection,
  RimeEntityState,
  RimeFireDataObject,
  RimeFireDataServiceError,
  RimeStateEntityConfig,
} from '../../models/base.model';

/**
 * A wrapper of DefaultDataServiceFactory.
 * Creates the FireDataService instance for the given entity.
 */
@Injectable()
export class RimeFireDataServiceFactory {
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: RimeStateEntityConfig,
    private angularFirestore: AngularFirestore
  ) {}

  /**
   * Create a fire {EntityCollectionDataService} for the given entity type
   *
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string) {
    return new RimeFireDataService<T>(entityName, this.entityConfig, this.angularFirestore);
  }
}

/**
 * A basic service for CRUD operations connected with Firebase.
 * Creates an instance of each entity.
 */
export class RimeFireDataService<T> {
  protected internalName!: string;
  protected delete404OK: boolean;
  protected entityName!: string;
  protected collectionName!: string;
  protected entityConfig!: RimeStateEntityConfig;
  protected entityUrl!: string;
  protected entitiesUrl!: string;
  protected getDelay = 0;
  protected saveDelay = 0;
  protected timeout = 0;

  constructor(
    @Inject(ENTITY_NAME) entityName: string,
    @Inject(ENTITY_CONFIG) entityConfig: RimeStateEntityConfig,
    private angularFirestore: AngularFirestore
  ) {
    this.entityConfig = entityConfig;
    this.internalName = `${entityName} FireDataService`;
    this.entityName = entityName;
    this.collectionName = this.getCollectionName(entityName);
    this.delete404OK = true;
  }

  /**
   * Adds an object into a collection
   *
   * @param entity The entire object to set in.
   */
  add(entity: T): Observable<any> {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
    return this.execute('set', undefined, entityOrError);
  }

  /**
   * Deletes a document in a collection
   *
   * @param uid The document UID from Firestore
   */
  delete(uid: string): Observable<string> {
    let err: Error | undefined;
    if (uid === null || uid === undefined) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }
    return this.execute('delete', uid, err).pipe(map((result) => ({...result})));
  }

  /**
   * Gets all documents from a collection
   */
  getAll(): Observable<any> {
    return this.execute('get');
  }

  /**
   * Gets a document by his UID
   *
   * @param uid The document UID from Firestore
   */
  getById(uid: string): Observable<T> {
    let err: Error | undefined;
    if (uid === null || uid === undefined) {
      err = new Error(`No "${this.entityName}" uid to get`);
    }
    return this.execute('get', uid, err);
  }

  /**
   * Gets an array of documents from a queries.
   *
   * @param queries An array of ConditionalQueryFirestore
   */
  getWithQuery(queries: ConditionalQueryFirestore[]): Observable<T[]> {
    return this.execute('get', undefined, {where: queries});
  }

  /**
   * Gets an array of documents with a limit that only returns the first matching
   * documents.
   *
   * @param limit The maximum number of items to return.
   */
  getWithLimit(limit: number): Observable<T[]> {
    return this.execute('get', undefined, {limit});
  }

  /**
   * Gets an array of documents that only returns the last matching
   * documents.
   *
   * You must specify at least one `orderBy` clause for `limitToLast` queries,
   * otherwise an exception will be thrown during execution.
   *
   * @param limit The maximum number of items to return.
   */
  limitToLast(limit: number): Observable<T[]> {
    return this.execute('get', undefined, {limitToLast: limit});
  }

  /**
   * Updates an existing document
   *
   * @param update
   */
  update(update: RimeEntityState<T>): Observable<T> {
    const id = update && update.id;
    const changesData = update && update.data && (update as any).changes;
    const changesUpdate = update && (update as any).changes;
    const updateOrError =
      id === null
        ? new Error(`No "${this.entityName}" update data or id`)
        : changesData || changesUpdate;
    console.log('UPDATE 0');
    return this.execute('update', id, updateOrError).pipe(
      map((result) => {
        console.log('UPDATE 1');
        return result;
      })
    );
  }

  /**
   * Gets the collection name from the record of entities
   *
   * @param entityName The name of the entity selected
   */
  private getCollectionName(entityName: string) {
    const plurals: Record<string, string> = this.entityConfig.pluralNames;
    const collection = plurals[entityName].toLowerCase();
    return collection;
  }

  /**
   * Checks if the method selected is allowed
   *
   * @param method A firebase method
   */
  private checkIfMethodIsImplemented(method: FirebaseMethods) {
    return method === 'get' || method === 'set' || method === 'delete' || method === 'update';
  }

  /**
   * Gets an observable of the delete promise from Firestore
   *
   * @param document The document UID
   * @param collection The collection name
   */
  private getObservableFromDelete(document: string, collection?: string) {
    let action = null;
    if (collection) {
      action = this.angularFirestore.collection(collection).doc(document).delete();
    }
    return of(action);
  }

  /**
   * Gets an observable of the set promise from Firestore
   *
   * @param data The object to be added in the collection as new document
   * @param collection The collection name
   */
  private getObservableFromSet(data: any, collection?: string) {
    if (collection) {
      return from(this.angularFirestore.collection(collection).add(data)).pipe(
        map((object) => {
          const newData = {...data, uid: object.id};
          return new RimeFireDataObject({id: object.id, data: () => newData});
        })
      );
    }
    return of();
  }

  /**
   * Gets an observable of the update promise fro Firestore
   *
   * @param update The object to be updated in the collection
   * @param collection The collection name
   */
  private getObservableFromUpdate(entity?: RimeEntityState<T>, collection?: string) {
    let action = null;
    if (collection && entity) {
      action = this.angularFirestore.collection(collection).doc<T>(entity.id).update(entity.data);
    } else {
      action = new Error(`No "${this.entityName}" update data or id`);
    }
    return of(action);
  }

  private getCollectionReferenceByConditions(ref: CollectionReference<unknown>, data: any) {
    const conditions: any = {
      limit: (limit: number) => ref.limit(limit),
      limitToLast: (limit: number) => ref.limitToLast(limit),
      where: (query: ConditionalQueryFirestore) =>
        ref.where(query.fieldPath, query.opStr, query.value),
      orderBy: (fieldPath: string | FieldPath, directionStr?: OrderByDirection) =>
        ref.orderBy(fieldPath, directionStr),
      startAt: (uid: string) =>
        ref.startAt(this.angularFirestore.collection(this.collectionName).doc(uid)),
      startAfter: (uid: string) =>
        ref.startAfter(this.angularFirestore.collection(this.collectionName).doc(uid)),
      endBefore: (uid: string) =>
        ref.endBefore(this.angularFirestore.collection(this.collectionName).doc(uid)),
      endAt: (uid: string) =>
        ref.endAt(this.angularFirestore.collection(this.collectionName).doc(uid)),
    };
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (key === 'where') {
          for (const eachKey in element) {
            if (Object.prototype.hasOwnProperty.call(element, eachKey)) {
              ref = conditions[key](element[eachKey]);
            }
          }
        } else {
          ref = conditions[key](element);
        }
      }
    }

    return ref;
  }

  private checkIfCollectionExists(collection: string) {
    return this.angularFirestore
      .collection(collection)
      .ref.limit(1)
      .get()
      .then((query) => query.empty);
  }
  /**
   * Gets an observable of the DocumentSnapshot or QuerySnapshot
   *
   * @param document The UID of the document
   * @param data Additional data for the queries
   * @param collection The collection name
   */
  private getObservableFromGet(document?: any, data?: any, collection?: string) {
    let action = null;
    if (collection) {
      if (!document && !data) {
        action = this.angularFirestore
          .collection(collection)
          .snapshotChanges()
          .pipe(
            catchError((error) => {
              console.error(error);
              return throwError(error);
            }),
            map((data0) => data0.map((object) => new RimeFireDataObject(object)))
          );
      } else if (document && !data) {
        action = this.angularFirestore
          .collection(collection)
          .doc(document)
          .snapshotChanges()
          .pipe(
            catchError((error) => {
              console.error(error);
              return throwError(error);
            }),
            map((object) => new RimeFireDataObject(object))
          );
      } else if (!document && data) {
        let ref: CollectionReference<unknown>;
        ref = this.angularFirestore.collection(collection).ref;
        ref = this.getCollectionReferenceByConditions(ref, data);
        action = of(ref.get()).pipe(
          switchMap((promise) => promise),
          catchError((error) => {
            console.error(error);
            return throwError(error);
          }),
          map((objects) => objects.docs),
          map((data0) =>
            data0
              .map((object) => new RimeFireDataObject(object))
              .filter((object) => (object.id && object.data ? true : false))
          )
        );
      }
    }
    return action;
  }

  /**
   * Performs the firestore request.
   *
   * @param method The allowed firebase methods
   * @param document The UID of a document
   * @param data Additional data for the document (data, error, or undefined/null)
   */
  protected execute(method: FirebaseMethods, document?: string, data?: any): Observable<any> {
    const req: FirebaseData = {method, document, data};
    const collection: string = this.collectionName;
    if (data instanceof Error) {
      return this.handleError(req)(data);
    }
    const observableFromMethod: Record<string, any> = {
      delete: () => this.getObservableFromDelete(req.document, collection),
      set: () => this.getObservableFromSet(req.data, collection),
      update: () => this.getObservableFromUpdate(req.data, collection),
      get: () => this.getObservableFromGet(req.document, req.data, collection),
    };
    let result$: Observable<any>;
    result$ = observableFromMethod[`${method}`]();
    if (this.checkIfMethodIsImplemented(method)) {
      if (this.saveDelay) {
        result$ = result$.pipe(delay(this.saveDelay));
      }
    } else {
      const error = new Error('Unimplemented Firebase method, ' + method);
      result$ = throwError(error);
    }
    if (this.timeout) {
      result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
    }
    return result$.pipe(catchError(this.handleError(req)));
  }

  /**
   * Emits the error
   *
   * @param reqData The FirebaseData configuration
   */
  private handleError(reqData: FirebaseData) {
    return (err: any) => {
      const ok = this.handleDelete404(err, reqData);
      if (ok) {
        return ok;
      }
      const error = new RimeFireDataServiceError(err, reqData);
      return throwError(error);
    };
  }

  /**
   * Deletes the document if there is an error or it is removed.
   *
   * @param error A HttpErrorResponse
   * @param reqData The FisebaseData configuration
   */
  private handleDelete404(error: HttpErrorResponse, reqData: FirebaseData) {
    if (error.status === 404 && reqData.method === 'delete' && this.delete404OK) {
      return of({});
    }
    return undefined;
  }
}
