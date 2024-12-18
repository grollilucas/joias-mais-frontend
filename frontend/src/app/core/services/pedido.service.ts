import { Injectable } from '@angular/core'; // Marca a classe como injetável para ser usada em outros componentes/serviços.
import { HttpClient } from '@angular/common/http'; // Permite fazer requisições HTTP para a API.
import { Observable } from 'rxjs'; // Representa um fluxo de dados assíncrono que será consumido.

import { environment } from 'src/environments/environment';

export interface Pedidos{
  id?: number;
  valor?: number;
  acrescimos?: number;
  descontos?: number;
  cliente_id?: number;
  vendedor_id?: number;
  emissao?: Date;
}

export interface DataInterface{
  data: Pedidos[]
}

export interface PedidoInterface{
  data: Pedidos
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

  getPedido(id: number): Observable<PedidoInterface> {
    return this.http.get<PedidoInterface>(`${this.pedidosUrl}/${id}`);
  }

  atualizaPedido(id: number, body: Pedidos): Observable<any> {
    return this.http.put<PedidoInterface>(`${this.pedidosUrl}/${id}`, body);
  }
  
  deletarPedido(id: number): Observable<any> {
    return this.http.delete<PedidoInterface>(`${this.pedidosUrl}/${id}`);
  }
}




