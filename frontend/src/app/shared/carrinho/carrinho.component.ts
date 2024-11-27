import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/core/services/carrinho.service';
import { Produto } from 'src/app/core/services/produtos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent {
  constructor(public carrinhoService: CarrinhoService, private router: Router) {}

  get total(): number {
    return this.carrinhoService
      .getCarrinho()
      .reduce((sum, item) => sum + item.produto.preco * item.quantidade, 0);
  }

  removerItem(produto: Produto) {
    this.carrinhoService.removerDoCarrinho(produto);
  }

  enviarPedido() {
    console.log('Pedido enviado:', this.carrinhoService.getCarrinho());
    this.carrinhoService.enviaPedido().subscribe((retorno) => {
      console.log("Foi para api o pedido ->", retorno);
      this.carrinhoService.limparCarrinho();
      window.location.reload();
    })
  }
}
