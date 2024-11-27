import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ClientesInterface, ClienteInterface, ClienteService } from 'src/app/core/services/cliente.service';

@Component({
    selector: 'clientes',
    templateUrl: 'clientes.component.html',
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
        RouterModule
    ],
})

export class ClientesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'email', 'actions']; // Define as colunas exibidas na tabela.
    dataSource: MatTableDataSource<any>; // Gerencia os dados da tabela.

    @ViewChild(MatPaginator) paginator!: MatPaginator; // Controla a paginação.
    @ViewChild(MatSort) sort!: MatSort; // Controla a ordenação.

    constructor(private clienteService: ClienteService,
        private router: Router,
    ) { // Injeta o serviço de pedidos no componente.
        this.dataSource = new MatTableDataSource<any>; // Inicializa a tabela sem dados.
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value; // Captura o texto digitado na barra de pesquisa.
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra os dados da tabela com base no texto.

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage(); // Retorna à primeira página ao aplicar o filtro.
        }
    }

    ngOnInit() {
        this.clienteService.getClientes().subscribe((data: ClientesInterface) => {
            console.log(data);
            this.dataSource = new MatTableDataSource(data.data); // Atribui os dados retornados pela API à tabela.
        },)
    }

    deletarCliente(id: number) {
        this.clienteService.deletarCliente(id).subscribe({
            next: () => {
                console.log(`Produto com ID ${id} deletado com sucesso!`);
            },
            error: (err) => {
                console.error('Erro ao deletar o cliente:', err);
            }
        });
        this.router.navigate(['/']); // Redireciona ou atualiza a página
    }
}