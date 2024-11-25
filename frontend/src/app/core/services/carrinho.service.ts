import { Injectable } from '@angular/core';
import { Produto } from './produtos.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private itens: { produto: Produto; quantidade: number }[] = [];

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

  removerDoCarrinho(produto: Produto) {
    this.itens = this.itens.filter((i) => i.produto.nome !== produto.nome);
  }

  limparCarrinho() {
    this.itens = [];
  }
}
