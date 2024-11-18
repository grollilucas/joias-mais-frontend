import { Component, Input } from '@angular/core';
import { Produto } from 'src/app/core/services/produtos.service';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent {
  
  @Input()
  produto?: Produto;
}
