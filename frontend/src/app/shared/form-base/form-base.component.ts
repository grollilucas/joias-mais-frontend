import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ClienteInterface, ClienteService } from 'src/app/core/services/cliente.service';
import { UnidadeFederativa } from 'src/app/core/types/type';


@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) {this.token = this.storage.getItem('token'); }

  id?: number;
  cliente: Cliente = { nome: '', email: '', telefone: '', ddd: '', cnpj: '', cpf: ''};


  storage = localStorage; 
  token?: string | null;

  ngOnInit() {
    this.id =  this.route.snapshot.params['id'];
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null],
      cnpj: [null],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      ddd: [null, Validators.required],
      aceitarTermos: [null, [Validators.requiredTrue]]
    });

    if(this.id){
      console.log('Está editando -> ', this.id);

      this.clienteService.getCliente(this.id).subscribe((data: ClienteInterface) => {
        this.cliente = data.data;
        this.cadastroForm = this.formBuilder.group({
          nome: [this.cliente.nome, Validators.required],
          cpf: [this.cliente.cpf],
          cnpj: [this.cliente.cnpj],
          email: [this.cliente.email, [Validators.required, Validators.email]],
          telefone: [this.cliente.telefone, Validators.required],
          ddd: [this.cliente.ddd, Validators.required],
          aceitarTermos: [true, [Validators.requiredTrue]]
        });
      })

      return;
    }
  }

  enviarCliente(){
    this.cliente = {
      ...this.cliente,
      nome: this.cadastroForm.controls['nome'].value,
      email: this.cadastroForm.controls['email'].value,
      telefone: this.cadastroForm.controls['telefone'].value,
      ddd: this.cadastroForm.controls['ddd'].value,
      cnpj: this.cadastroForm.controls['cnpj'].value,
      cpf: this.cadastroForm.controls['cpf'].value,
    };

    if(this.id){
      this.clienteService.atualizaCliente(this.id, this.cliente).subscribe((retorno) => {
        if(retorno.data){
          this.router.navigate(['clientes']);
        }
      });
      return;
    }

    this.clienteService.criaCliente(this.cliente).subscribe((retorno) => {
      if(retorno.data){
        this.router.navigate(['login']);
      }
    });

  }
}
