import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-accetta-paziente-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './accetta-paziente-page.component.html',
  styleUrl: './accetta-paziente-page.component.css'
})
export class AccettaPazientePageComponent implements OnInit {

  patientForm!: FormGroup;

  ospedaleOptions = ["Ospedale1", "Ospedale2", "Ospedale3"];
  repartoOptions  = ["Reparto 1", "Reparto 2", "Reparto 3"];
  codiceColoreOptions    = ["BIANCO", "VERDE", "AZZURRO", "ARANCIONE", "ROSSO"];

  // /lista-reparti/ospedale_id

  ngOnInit() {
    this.patientForm = new FormGroup({
      nome: new FormControl(""),
      cognome: new FormControl(""),
      dataNascita: new FormControl(""),
      codiceFiscale: new FormControl(""),
      ospedale: new FormControl(""),
      reparto: new FormControl(""),
      codiceColore: new FormControl(""),
      codice: new FormControl(""),
      stato: new FormControl("")
    })
  }

  onSubmit() {}
}
