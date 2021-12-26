import {EntityMetadataMap} from '@ngrx/data';
import {FirebaseOptions} from '@angular/fire/app';

export interface StateEntityConfig {
  entityMetadata: EntityMetadataMap;
  pluralNames: any;
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
