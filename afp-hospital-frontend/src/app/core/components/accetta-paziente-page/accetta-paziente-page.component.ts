import { Component, inject, OnInit, computed, signal } from '@angular/core';
import {
  CreazionePaziente,
  CodiceColore,
  StatoPZ,
} from '../../models/Paziente.model';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-accetta-paziente-page',
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './accetta-paziente-page.component.html',
  styleUrl: './accetta-paziente-page.component.css',
})
export class AccettaPazientePageComponent implements OnInit {
  // variables
  patientForm!: FormGroup;
  paziente!: CreazionePaziente;

  // options
  ospedaleOptions = computed(() => this.apiService.ospedaliComputed());
  repartoOptions = computed(() => this.apiService.listaRepartiComputed());
  codiceColoreOptions = [
    CodiceColore.BIANCO,
    CodiceColore.VERDE,
    CodiceColore.AZZURRO,
    CodiceColore.ARANCIONE,
    CodiceColore.ROSSO,
  ];
  statoOptions = [StatoPZ.IN_ATTESA, StatoPZ.IN_CARICO];

  anonymouseMode = signal<boolean>(false);

  // utils items
  apiService = inject(ApiService);
  fb = inject(FormBuilder);

  constructor() {}

  ngOnInit() {
    this.patientForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: ['', [Validators.required]],
      ospedale: ['', [Validators.required]],
      reparto: [''],
      codiceColore: ['', [Validators.required]],
      stato: ['', [Validators.required]],
    });

    this.patientForm.get('ospedale')?.valueChanges.subscribe((value) => {
      this.apiService.getListaReparti(value);
    });
  }

  switchAnonymousMode() {
    this.anonymouseMode.set(!this.anonymouseMode());

    if (this.anonymouseMode()) {
      this.patientForm.get('nome')?.disable();
      this.patientForm.get('cognome')?.disable();
      this.patientForm.get('dataNascita')?.disable();
      this.patientForm.get('codiceFiscale')?.disable();
      this.patientForm.patchValue({
        nome: 'Anonimo',
        cognome: 'Anonimo',
        dataNascita: '2000-01-01',
        codiceFiscale: 'ANONIM0001',
      });
    } else {
      this.patientForm.get('nome')?.enable();
      this.patientForm.get('cognome')?.enable();
      this.patientForm.get('dataNascita')?.enable();
      this.patientForm.get('codiceFiscale')?.enable();
      this.patientForm.patchValue({
        nome: '',
        cognome: '',
        dataNascita: '',
        codiceFiscale: '',
      });
    }
  }

  onSubmit() {
    this.paziente = {
      nome: this.patientForm.value.nome,
      cognome: this.patientForm.value.cognome,
      dataNascita: this.patientForm.value.dataNascita,
      codiceFiscale: this.patientForm.value.codiceFiscale,
      codiceColore: this.patientForm.value.codiceColore,
      stato: this.patientForm.value.stato,
      ospedaleId: this.patientForm.value.ospedale,
      repartoId:
        this.patientForm.value.reparto === ''
          ? null
          : this.patientForm.value.reparto,
    };

    this.apiService.accettaPaziente(this.paziente);
  }
}
