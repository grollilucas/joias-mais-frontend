import { Component, OnInit } from '@angular/core';

import { ProdutoService, Produto } from 'src/app/core/services/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private produtoService: ProdutoService){}
  produtos: Produto[] = [];
  ngOnInit(): void {
      this.produtoService.getProdutos().subscribe((data) => {
        this.produtos = data.data;
      })
  }
  
}
