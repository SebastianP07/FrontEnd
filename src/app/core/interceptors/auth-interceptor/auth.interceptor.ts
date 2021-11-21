import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const authorizationCustom = this.getAuthorizationCustom(request);
    const auth = window.btoa('angularApp' + ':' + '12345');
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${auth}`,
        'Content-type': this.getContentType(request),
      },
    });
    return request;
  }

  getAuthorizationCustom(request: any): string {
    if (request.url.indexOf('/oauth/token') > 0) {
      return `Basic angularApp:12345`;
    } else {
      return `Bearer asdfghjk123`;
    }
  }

  getContentType(request: HttpRequest<any>): string {
    if ((request.url.includes('/impuesto/registrar')
        || request.url.includes('/contribuyente/editar')
        || request.method === 'PUT'
        || request.method === 'POST')
      && !request.url.includes('/security/oauth/token')) {
      return 'application/json';
    } else {
      return 'application/x-www-form-urlencoded';
    }
  }
}
