import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoInterface, ProdutoService, ProdutosInterface } from 'src/app/core/services/produtos.service';


@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.scss']
})
export class FormProdutosComponent implements OnInit {
  produtoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router
  ) { this.token = this.storage.getItem('token'); }

  id?: number;
  produto: Produto = { id: 0, nome: '', preco: 0,  url_foto: '', estoque: 0 };

  storage = localStorage;
  token?: string | null;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.produtoForm = this.formBuilder.group({
      nome: [null, Validators.required],
      preco: [null, Validators.required],
      url_foto: [null, Validators.required],
      estoque: [[0, Validators.required]]
    });

    if (this.id) {
      console.log('Está editando -> ', this.id);
      this.produtoService.getProduto(this.id).subscribe((data: ProdutoInterface) => {
      //this.produto = data.data
        this.produtoForm = this.formBuilder.group({
          nome: [this.produto.nome, Validators.required],
          preco: [this.produto.preco, Validators.required],
          url_foto: [this.produto.url_foto, Validators.required],
          estoque: [[this.produto.estoque, Validators.required]]
        });
      })
      return;
    }
  }

  enviarProduto() {
    this.produto = {
      ...this.produto,
      nome: this.produtoForm.controls['nome'].value,
      preco: this.produtoForm.controls['preco'].value,
      url_foto: this.produtoForm.controls['url_foto'].value
    };

    if (this.id) {
      this.produtoService.atualizaProduto(this.id, this.produto).subscribe((retorno) => {
        if (retorno.data) {
          this.router.navigate(['produtos']);
        }
      });
      return;
    }

    this.produtoService.criaProduto(this.produto).subscribe((retorno) => {
      if (retorno.data) {
        this.router.navigate(['produtos']);
      }
    });

  }
}
