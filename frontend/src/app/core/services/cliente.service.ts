import { Injectable } from '@angular/core'; // Marca a classe como injetável para ser usada em outros componentes/serviços.
import { HttpClient } from '@angular/common/http'; // Permite fazer requisições HTTP para a API.
import { Observable } from 'rxjs'; // Representa um fluxo de dados assíncrono que será consumido.

import { environment } from 'src/environments/environment';

export interface Cliente{
    id?: number;
    nome: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    ddd: string;
    telefone: string;
    vendedor_id?: number;
    created_at?: Date;
    updated_at?: Date;
}
  
export interface ClientesInterface{
    data: Cliente[]
}

export interface ClienteInterface{
    data: Cliente
}

@Injectable({
    providedIn: 'root', // Torna o serviço disponível globalmente no aplicativo.
  })
  export class ClienteService {
    private clientesUrl = `${environment.apiUrl}/clientes`; // Define a URL completa da API de pedidos.
  
    constructor(private http: HttpClient) {}
  
    // Método para buscar pedidos do backend
    getClientes(): Observable<ClientesInterface> {
      return this.http.get<ClientesInterface>(this.clientesUrl); // Faz uma requisição GET à API e retorna os dados como um Observable.
    }

    getCliente(id: number): Observable<ClienteInterface>{
        return this.http.get<ClienteInterface>(`${this.clientesUrl}/${id}`);
    }
    criaCliente(body: Cliente): Observable<any>{
      return this.http.post<Cliente>(`${this.clientesUrl}`, body);
    }
    atualizaCliente(id: number, body: Cliente): Observable<any>{
      return this.http.put<ClienteInterface>(`${this.clientesUrl}/${id}`, body);
    }
    deletarCliente(id: number): Observable<any> {
      return this.http.delete<ClienteInterface>(`${this.clientesUrl}/${id}`);
    }
  }