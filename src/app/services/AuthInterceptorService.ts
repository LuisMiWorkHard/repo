import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionService } from './sesion.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private sesionService: SesionService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if (this.sesionService.MAP_URL.get(req.url) == null) {
            var usuario = this.sesionService.getSesion();
            if (usuario) {
                request = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${usuario.TOKEN}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}