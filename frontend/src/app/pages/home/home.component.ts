import { Component, OnInit } from '@angular/core';

import { ProdutoService, Produto, ProdutoApi } from 'src/app/core/services/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  constructor(private produtoService: ProdutoService) { }
  produtos: Produto[] = [];
  ngOnInit(): void {


    this.produtoService.getProdutos().subscribe((data) => {

      const produtosApi: ProdutoApi[] = data.data;

      const produtosFiltrados: ProdutoApi[] = produtosApi.filter((produto: ProdutoApi) => 
        produto.estoque.quantidade > 0
      );
      

      const produtosConvertidos: Produto[] = produtosFiltrados.map((produto: ProdutoApi) => {
        return {
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          url_foto: produto.url_foto,
          vendedor_id: produto.vendedor_id,
          created_at: produto.created_at,
          updated_at: produto.updated_at,
          estoque: produto.estoque.quantidade,
        } as Produto;
      })

      this.produtos = produtosConvertidos;
    });
    
  }

}
