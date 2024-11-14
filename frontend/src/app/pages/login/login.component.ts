import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServer: AutenticacaoService,
    private router: Router
  ){}


  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    senha: [null, Validators.required]
   })
  }

  login(){
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    console.log('test', this.loginForm.value)

    this.authServer.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('funcionaAA', value)
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        console.log('erro no Login', err)
      }
    })
  }
}
