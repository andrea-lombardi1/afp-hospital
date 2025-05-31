import { Component } from '@angular/core';
import { PazienteListItemComponent } from '../../utils/paziente-list-item/paziente-list-item.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-lista-pazienti-page',
  standalone: true,
  imports: [
    PazienteListItemComponent,
    NavbarComponent
  ],
  templateUrl: './lista-pazienti-page.component.html',
  styleUrl: './lista-pazienti-page.component.css'
})
export class ListaPazientiPageComponent {

}
