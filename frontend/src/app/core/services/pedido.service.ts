import { Injectable } from '@angular/core'; // Marca a classe como injetável para ser usada em outros componentes/serviços.
import { HttpClient } from '@angular/common/http'; // Permite fazer requisições HTTP para a API.
import { Observable } from 'rxjs'; // Representa um fluxo de dados assíncrono que será consumido.

import { environment } from 'src/environments/environment';

export interface Pedidos{
  valor: number;
  id: number;
}

export interface DataInterface{
  data: Pedidos[]
}


@Injectable({
  providedIn: 'root', // Torna o serviço disponível globalmente no aplicativo.
})
export class PedidoService {
  private pedidosUrl = `${environment.apiUrl}/pedidos`; // Define a URL completa da API de pedidos.

  constructor(private http: HttpClient) {
    
  } 
  token?: string | null;

  // Método para buscar pedidos do backend
  getPedidos(): Observable<DataInterface> {
    return this.http.get<DataInterface>(this.pedidosUrl); // Faz uma requisição GET à API e retorna os dados como um Observable.
  }
}
