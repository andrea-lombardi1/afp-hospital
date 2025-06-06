import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PazienteListItemComponent } from './core/components/paziente-list-item/paziente-list-item.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PazienteListItemComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'afp-hospital-frontend';
}
