import { Component, computed, inject, OnInit } from '@angular/core';
import { PazienteListItemComponent } from '../../utils/paziente-list-item/paziente-list-item.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Paziente } from '../../models/Paziente.model';

@Component({
  selector: 'app-lista-pazienti-page',
  standalone: true,
  imports: [
    PazienteListItemComponent,
    NavbarComponent,
    DialogModule,
    ButtonModule,
    SelectModule,
    FormsModule
  ],
  templateUrl: './lista-pazienti-page.component.html',
  styleUrl: './lista-pazienti-page.component.css'
})
export class ListaPazientiPageComponent {
  apiService = inject(ApiService);
  visible = false;
  selectedStato = "";
  statiPaziente = [
    { label: 'In attesa', value: 'IN ATTESA' },
    { label: 'In carico', value: 'IN CARICO' },
    { label: 'Trasferisci', value: 'TRASFERITO' },
    { label: 'Dimetti', value: 'DIMESSO' }
  ];
  selectedOspedale = null;
  selectedReparto = null;
  pazienteSelezionato: Paziente | undefined;
  ospedaliC = computed(() => this.apiService.ospedaliComputed());
  repartiC = computed(() => this.apiService.listaRepartiComputed());
  get ospedali() {
    return this.ospedaliC().map((ospedale: any) => ({
      label: ospedale.nome,
      value: ospedale.id
    }));
  }
  get reparti() {
    return this.repartiC().map((reparto: any) => ({
      label: reparto.nome,
      value: reparto.id
    }));
  }

  pazienti = computed(() => this.apiService.listaPz());

  setReparti(ospedaleId: number) {
    this.apiService.getListaReparti(ospedaleId);
    this.selectedReparto = null;
  }

  cambiaStatoList(paziente: any) {
    this.visible = true;
    this.pazienteSelezionato = paziente;
  }

  modificaPaziente() {
    console.log("Modifica paziente:", this.pazienteSelezionato);
    
    if (this.pazienteSelezionato) {
      this.apiService.modificaStatoPaziente(this.pazienteSelezionato.id_paziente, this.selectedStato, this.selectedOspedale, this.selectedReparto);
      this.visible = false;
      this.selectedStato = "";
      this.selectedOspedale = null;
      this.selectedReparto = null;
      this.pazienteSelezionato = undefined;
    }
  }

      
}
