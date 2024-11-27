import { Injectable } from '@angular/core';
import { Produto } from './produtos.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ItemPost{
    valor_unitario: number,
    quantidade: number,
    produto_id: number,
}

export interface PedidoPost{
    valor?: number,
    acrescimentos?: number,
    descontos?: number,
    cliente_id: number,
    vendedor_id: number,
    itens: ItemPost[]
}

@Injectable({
    providedIn: 'root',
})
export class CarrinhoService {
    constructor(private http: HttpClient) { }
    private itens: { produto: Produto; quantidade: number }[] = [];
    private apiUrl = environment.apiUrl;

    getCarrinho() {
        return this.itens;
    }

    adicionarAoCarrinho(produto: Produto) {
        const item = this.itens.find((i) => i.produto.nome === produto.nome);
        if (item) {
            item.quantidade++;
        } else {
            this.itens.push({ produto, quantidade: 1 });
        }
    }

    enviaPedido(): Observable<any> {
        const pedido = {
            cliente_id: 2,
            vendedor_id: 2,
            descontos: 0,
            acrescimos: 0,
            valor: this.itens.reduce((sum, item) => sum + item.produto.preco * item.quantidade, 0),
            itens: this.itens.map((item) => ({produto_id: item.produto.id, quantidade: item.quantidade, valor_unitario: item.produto.preco}) as ItemPost)
        } as PedidoPost;

        console.log(pedido);

        return this.http.post(`${this.apiUrl}/pedidos`, pedido);
    }

    removerDoCarrinho(produto: Produto) {
        this.itens = this.itens.filter((i) => i.produto.nome !== produto.nome);
    }

    limparCarrinho() {
        this.itens = [];
    }
}
