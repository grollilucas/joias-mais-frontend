import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

export interface UserData {
  id: string;
  name: string;
  date: Date;
  fruit: string;
  value: string; // Adicionando a propriedade 'value'
  actions: string; // Adicionando a propriedade 'actions'
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

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
    CommonModule
  ],
})

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
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.floor(Math.random() * NAMES.length)] +
    ' ' +
    NAMES[Math.floor(Math.random() * NAMES.length)].charAt(0) +
    '.';

  // Gerando uma data aleatória entre 2022-01-01 e hoje
  const startDate = new Date(2022, 0, 1); // 1 de janeiro de 2022
  const endDate = new Date(); // Data atual
  const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

  // Gerando um valor aleatório formatado como R$XX,00
  const value = `R$${(Math.random() * 100).toFixed(2).replace('.', ',')}`;

  return {
    id: id.toString(),
    name: name,
    fruit: FRUITS[Math.floor(Math.random() * FRUITS.length)],
    date: date,
    value: value, // A nova propriedade
    actions: 'Ações', // Placeholder para a coluna de ações
  };
}
