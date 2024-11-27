import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInterface, PedidoInterface, Pedidos, PedidoService } from 'src/app/core/services/pedido.service';
import { Produto, ProdutoInterface, ProdutoService, ProdutosInterface } from 'src/app/core/services/produtos.service';


@Component({
  selector: 'app-form-pedidos',
  templateUrl: './form-pedidos.html',
  styleUrls: ['./form-pedidos.scss']
})
export class FormPedidos implements OnInit {
  pedidoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) { this.token = this.storage.getItem('token'); }


  id?: number;
  pedido: Pedidos = { id: 0, valor: 0, acrescimos: 0, descontos: 0 };

  storage = localStorage;
  token?: string | null;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      console.log('Está editando -> ', this.id);

      this.pedidoService.getPedido(this.id).subscribe((data: PedidoInterface) => {
        this.pedido = data.data
        this.pedidoForm = this.formBuilder.group({
          valor: [this.pedido.valor, Validators.required],
          acrescimo: [this.pedido.acrescimos, Validators.required],
          descontos: [this.pedido.descontos, Validators.required],
        });
      })
      return;
    }
  }

  enviarPedido() {
    this.pedido = {
      ...this.pedido,
      valor: this.pedidoForm.controls['valor'].value,
      acrescimos: this.pedidoForm.controls['acrescimo'].value,
      descontos: this.pedidoForm.controls['valor'].value,
      
    };

    if (this.id) {
      this.pedidoService.atualizaPedido(this.id, this.pedido).subscribe((retorno) => {
        if (retorno.data) {
          this.router.navigate(['pedidos']);
        }
      });
      return;
    }

  }
}
