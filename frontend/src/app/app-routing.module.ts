import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormBaseComponent } from './shared/form-base/form-base.component';
import { PedidosComponent } from './shared/pedidos/pedidos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: FormBaseComponent,
  },
  {
    path: 'cadastro/:id',
    component: FormBaseComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  }, 
  {
    path: 'clientes',
    component: ClientesComponent
  }
  /*{
    path: 'produtos/:id',
    component: DetalheDoProduto
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
