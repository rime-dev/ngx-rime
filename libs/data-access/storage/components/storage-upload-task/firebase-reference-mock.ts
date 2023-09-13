/*
  Mock for firebase.storage.Reference
  https://firebase.google.com/docs/reference/js/firebase.storage.Reference
*/

import {of} from 'rxjs';

export class RimeMockStorageReference<AngularFireStorageReference> {
  public bucket: any;
  public storage: any;
  public parent: any;
  public name: any;
  public root: any;
  public fullPath: any;
  private _children: any;
  private _contents: any;
  constructor(
    storage: any,
    name: string,
    parent?: RimeMockStorageReference<AngularFireStorageReference>
  ) {
    this.bucket = parent ? parent.bucket : name;
    this.storage = storage;
    this.parent = parent;
    this.name = name;
    this.root = parent ? parent.root : this;
    this._children = {};
    this._contents = null;

    if (parent) {
      const fullpath = parent.fullPath as string;
      this.fullPath = fullpath + '/' + name;
      parent._children[name] = this;
    } else {
      this.fullPath = name;
    }
  }

  child(path: string) {
    // replace multiple consecutive slashs with single slash
    path = path.replace(/\/+/g, '/');

    // replace leading slash
    path = path.replace(/^\//g, '');

    // replace trailing slash
    path = path.replace(/\/$/g, '');

    // get all paths
    const paths = path.split('/');

    // create child reference
    const childPath = paths.shift();
    if (childPath && !this._children[childPath]) {
      this._children[childPath] = new RimeMockStorageReference(this.storage, childPath, this);
    }
    if (childPath) {
      if (paths.length === 0) {
        return this._children[childPath];
      }
      return this._children[childPath].child(paths.join('/'));
    }
  }

  getDownloadURL() {
    return of(this.storage.getURL());
  }

  delete() {
    this._contents = null;
    return of();
  }

  put(data: any) {
    this._contents = data;
    return of();
  }

  putString(data: any) {
    this._contents = data;
    return of();
  }

  getMetadata() {
    return of();
  }
  updateMetadata() {
    return of();
  }
  list() {
    return of();
  }
  listAll() {
    return of();
  }
}
