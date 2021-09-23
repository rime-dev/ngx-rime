import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

let users: any[] = [];

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    const register = () => {
      const user = body;

      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    };

    const authenticate = () => {
      const {username, password} = body;
      const user = users.find((x) => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token',
      });
    };

    const getUsers = () => {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    };

    const getUserById = () => {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    };

    const deleteUser = () => {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    };

    const ok = (body2?: any) => of(new HttpResponse({status: 200, body: body2}));

    const unauthorized = () => throwError({status: 401, error: {message: 'Unauthorised'}});

    const error = (message: any) => throwError({error: {message}});

    const isLoggedIn = () => headers.get('Authorization') === 'Bearer fake-jwt-token';

    const idFromUrl = () => {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 2);
    };

    const handleRoute = () => {
      switch (true) {
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
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
  static provider(value: any): import('@angular/core').Provider {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptor,
      multi: true,
      useValue: value,
    };
  }
}
