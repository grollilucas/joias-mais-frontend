import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  autenticar(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, { email, senha })
  }
}
