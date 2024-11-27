import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormBaseComponent } from './shared/form-base/form-base.component';
import { PedidosComponent } from './shared/pedidos/pedidos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { FormProdutosComponent } from './pages/produtos/form-produtos/form-produtos.component';
import { FormPedidos } from './shared/pedidos/form-pedidos/form-pedidos';

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
    path: 'produtos',
    component: ProdutosComponent,
  },
  {
    path: 'produtos/novo',
    component: FormProdutosComponent,
  },
  {
    path: 'produtos/:id',
    component: FormProdutosComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  }, 
  {
    path: 'pedidos/:id',
    component: FormPedidos,
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
