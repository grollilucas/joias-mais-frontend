import { Injectable } from '@angular/core'; // Marca a classe como injetável para ser usada em outros componentes/serviços.
import { HttpClient } from '@angular/common/http'; // Permite fazer requisições HTTP para a API.
import { Observable } from 'rxjs'; // Representa um fluxo de dados assíncrono que será consumido.

import { environment } from 'src/environments/environment';

export interface Produto {
  nome: string;
  descricao?: string;
  preco: number;
  id: number;
  url_foto: string;
}

export interface ProdutoInterface {
  data: Produto[]
}

export interface ProdutosInterface{
  data: Produto[]
}


@Injectable({
  providedIn: 'root', // Torna o serviço disponível globalmente no aplicativo.
})
export class ProdutoService {

  private pedidosUrl = `${environment.apiUrl}/produtos`; // Define a URL completa da API de pedidos.

  constructor(private http: HttpClient) { }

  // Método para buscar pedidos do backend
  getProdutos(): Observable<ProdutoInterface> {
    return this.http.get<ProdutoInterface>(this.pedidosUrl); // Faz uma requisição GET à API e retorna os dados como um Observable.
  }

  getProduto(id: number): Observable<ProdutoInterface> {
    return this.http.get<ProdutoInterface>(`${this.pedidosUrl}/${id}`);
  }

  criaProduto(body: Produto): Observable<any>{
    return this.http.post<Produto>(`${this.pedidosUrl}`, body);
  }

  atualizaProduto(id: number, body: Produto): Observable<any> {
    return this.http.put<ProdutoInterface>(`${this.pedidosUrl}/${id}`, body);
  }
}
