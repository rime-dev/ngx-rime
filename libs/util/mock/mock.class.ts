import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, filter, materialize, mergeMap, switchMap} from 'rxjs/operators';
import {coerceNumberProperty} from '@angular/cdk/coercion';
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(@Inject('VALUES') private _values: any) {
    console.log('Init mock');
  }

  get values(): any {
    return this._values;
  }
  set values(value: any) {
    this._values = value;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    const createValue = () => {
      this.values.push(body);
      return ok(this.values);
    };

    const readValues = () => ok(this.values);

    const readValue = () => {
      const value = this.values.filter((x: any, index: number) => index === indexByURL());
      return ok(value);
    };

    const updateValue = () =>
      ok(this.values).pipe(
        switchMap((x: any) =>
          of(x.body).pipe(
            filter((y: any) => (y[indexByURL()] ? (y[indexByURL()] = body) : y)),
            switchMap((values) => ok(values))
          )
        )
      );

    const deleteValue = () => {
      this.values = this.values.filter((x: any, index: number) => index !== indexByURL());
      return ok(this.values);
    };

    const ok = (body2?: any) => of(new HttpResponse({status: 200, body: body2}));

    const unauthorized = () => throwError({status: 401, error: {message: 'Unauthorised'}});

    const error = (message: any) => throwError({error: {message}});

    const isLoggedIn = () => headers.get('Authorization') === 'Bearer fake-jwt-token';

    const indexByURL = () => {
      const urlParts = url.split('/');
      return coerceNumberProperty(urlParts[urlParts.length - 1]);
    };

    const handleRoute = () => {
      switch (true) {
        case !url.match(/\/\d+$/) && method === 'POST':
          return createValue();
        case url.match(/\/\d+$/) && method === 'POST':
          return updateValue();
        case !url.match(/\/\d+$/) && method === 'GET':
          return readValues();
        case url.match(/\/\d+$/) && method === 'GET':
          return readValue();
        case url.match(/\/\d+$/) && method === 'DELETE':
          return deleteValue();
        default:
          return next.handle(request);
      }
    };

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
export class Mock {
  static provider(values: any): import('@angular/core').Provider {
    return [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MockInterceptor,
        multi: true,
      },
      {
        provide: 'VALUES',
        useValue: values,
      },
    ];
  }
}
