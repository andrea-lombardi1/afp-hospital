import { Component, inject, computed, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  ospedaleIdControl = new FormControl("");

  apiService = inject(ApiService);

  currentTime = signal<Date>(new Date())

  ospedali = computed(() => this.apiService.ospedaliComputed());

  currentPath = computed(() => {
    const path = this.activatedRoute.snapshot.routeConfig?.path;
    return path;
  });

  ngOnInit(){
    setInterval(() => {
      this.currentTime.set(new Date())
    }, 1000)
  }

  filterPz(): void {
  const value = this.ospedaleIdControl.value || '';
  
  if (value === '') {
    // Handle the case for "Tutti gli ospedali" where value is empty
    this.apiService.getListaPazienti(); // or however you want to handle filtering all hospitals
  } else {
    this.apiService.getListaPazienti(value);
  }
}

}
