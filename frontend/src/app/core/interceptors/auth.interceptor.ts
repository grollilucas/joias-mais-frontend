import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    storage = localStorage; 
    token?: string | null;

    constructor(){
        this.token = this.storage.getItem('token');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiCall = req.url.includes('/api') && !req.url.includes('/login');
        if(isApiCall){
            console.log("Aplicou autenticação na requisição da rota", req.url);
              const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.token}`)
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}