import { Component, inject, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  imports: [DatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  apiService = inject(ApiService);

  currentDate = new Date();

  currentTime = new Date();

  ospedali = computed(() => this.apiService.ospedaliComputed());


  // TODO: implementare il metodo per aggiornare l'ora corrente
  updateTime() {
    this.currentTime = new Date();
  }

}
