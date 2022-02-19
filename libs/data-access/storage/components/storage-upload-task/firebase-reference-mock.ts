/*
  Mock for firebase.storage.Reference
  https://firebase.google.com/docs/reference/js/firebase.storage.Reference
*/

import {of} from 'rxjs';

export class MockStorageReference<AngularFireStorageReference> {
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
    parent?: MockStorageReference<AngularFireStorageReference>
  ) {
    this.bucket = parent ? parent.bucket : name;
    this.storage = storage;
    this.parent = parent;
    this.name = name;
    this.root = parent ? parent.root : this;
    this._children = {};
    this._contents = null;

    if (parent) {
      this.fullPath = parent.fullPath + '/' + name;
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
      this._children[childPath] = new MockStorageReference(this.storage, childPath, this);
    }
    if (childPath) {
      if (paths.length === 0) {
        return this._children[childPath];
      } else {
        return this._children[childPath].child(paths.join('/'));
      }
    }
  }

  getDownloadURL() {
    // setTimeout(() => {
    //   window.URL.revokeObjectURL(this.storage.getURL());
    // }, 1500);
    return of(this.storage.getURL());
    Promise.resolve(this.fullPath);
  }

  delete() {
    this._contents = null;
    return of();
    Promise.resolve();
  }

  put(data: any) {
    this._contents = data;
    return of();
    Promise.resolve();
  }

  putString(data: any) {
    this._contents = data;
    return of();
    Promise.resolve();
  }

  getMetadata() {
    return of();
    Promise.resolve();
  }
  updateMetadata() {
    return of();
    Promise.resolve();
  }
  list() {
    return of();
    Promise.resolve();
  }
  listAll() {
    return of();
    Promise.resolve();
  }
}
