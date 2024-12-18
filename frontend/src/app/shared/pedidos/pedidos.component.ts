
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { PedidoService, DataInterface } from 'src/app/core/services/pedido.service';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

export interface UserData {
  id: string;
  name: string;
  date: Date;
  fruit: string;
  value: string; // Adicionando a propriedade 'value'
  actions: string; // Adicionando a propriedade 'actions'
}


@Component({
  selector: 'app-pedidos',
  styleUrls: ['pedidos.component.scss'],
  templateUrl: 'pedidos.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
})
/*
export class PedidosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'fruit', 'date', 'value', 'actions']; // Adicionando as novas colunas
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 10 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}*/

export class PedidosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'valor', 'acrescimos', 'descontos', 'emissao', 'actions']; // Define as colunas exibidas na tabela.
  dataSource: MatTableDataSource<any>; // Gerencia os dados da tabela.

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Controla a paginação.
  @ViewChild(MatSort) sort!: MatSort; // Controla a ordenação.

  constructor(private pedidoService: PedidoService, private router: Router) { // Injeta o serviço de pedidos no componente.
    this.dataSource = new MatTableDataSource<any>; // Inicializa a tabela sem dados.
  }

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(
      (data: DataInterface) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data.data); // Atribui os dados retornados pela API à tabela.
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error); // Exibe erros no console caso a requisição falhe.
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Conecta a paginação à tabela.
    this.dataSource.sort = this.sort; // Conecta a ordenação à tabela.
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Captura o texto digitado na barra de pesquisa.
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra os dados da tabela com base no texto.

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Retorna à primeira página ao aplicar o filtro.
    }
  }

  filterByDate(startDate: Date, endDate: Date) {
    this.dataSource.data = this.dataSource.data.filter((pedido: any) => {
      const pedidoDate = new Date(pedido.date); // Converte a data do pedido para o formato Date.
      return pedidoDate >= startDate && pedidoDate <= endDate; // Retorna apenas os pedidos dentro do intervalo.
    });
  }

  deletarPedido(id: number) {
    this.pedidoService.deletarPedido(id).subscribe({
      next: () => {
        console.log(`Produto com ID ${id} deletado com sucesso!`);
      },
      error: (err) => {
        console.error('Erro ao deletar o produto:', err);
      }
    });
    this.router.navigate(['/']);
    // Redireciona ou atualiza a página
  }
}
  
/*

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

import { PedidoService } from 'src/app/core/services/pedido.service'; // Importa o serviço que criamos para buscar os pedidos.

@Component({
  selector: 'app-pedidos', // Identifica o componente.
  styleUrls: ['pedidos.component.scss'], // Arquivo de estilos do componente.
  templateUrl: 'pedidos.component.html', // Arquivo HTML do componente.
})
export class PedidosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'fruit', 'date', 'value', 'actions']; // Define as colunas exibidas na tabela.
  dataSource: MatTableDataSource<any>; // Gerencia os dados da tabela.

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Controla a paginação.
  @ViewChild(MatSort) sort!: MatSort; // Controla a ordenação.

  constructor(private pedidoService: PedidoService) { // Injeta o serviço de pedidos no componente.
    this.dataSource = new MatTableDataSource([]); // Inicializa a tabela sem dados.
  }

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(
      (data) => {
        this.dataSource.data = data; // Atribui os dados retornados pela API à tabela.
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error); // Exibe erros no console caso a requisição falhe.
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Conecta a paginação à tabela.
    this.dataSource.sort = this.sort; // Conecta a ordenação à tabela.
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Captura o texto digitado na barra de pesquisa.
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra os dados da tabela com base no texto.

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Retorna à primeira página ao aplicar o filtro.
    }
  }

  filterByDate(startDate: Date, endDate: Date) {
    this.dataSource.data = this.dataSource.data.filter((pedido: any) => {
      const pedidoDate = new Date(pedido.date); // Converte a data do pedido para o formato Date.
      return pedidoDate >= startDate && pedidoDate <= endDate; // Retorna apenas os pedidos dentro do intervalo.
    });
  }
}
*/
