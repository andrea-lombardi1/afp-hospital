import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { retry, map, finalize } from 'rxjs';
import { Paziente, CreazionePaziente, ListaPazienti } from '../models/Paziente.model';
import { HttpRes } from '../models/RespManager';
import { OspedaliModel } from '../models/OspedaliModel';
import { RepartiModel } from '../models/RepartiModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #URL = 'http://localhost:3000';

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  /**
   * Signal che gestisce i Pazienti
   */
  readonly #listaPz = signal<ListaPazienti>({AZZURRO: [], ARANCIONE: [], VERDE: [], ROSSO: [], BIANCO: []});
  listaPz = computed(() => this.#listaPz());

  // #filteredPz = signal<ListaPazienti>(this.#listaPz());
  // filteredPzComputed = computed(() => this.#filteredPz());

  #listaOspedali = signal<OspedaliModel[]>([]);
  ospedaliComputed = computed(() => this.#listaOspedali());

  #listaReparti = signal<RepartiModel[]>([]);
  listaRepartiComputed = computed(() => this.#listaReparti());

  constructor() {
    this.getProntiSoccorso();
    this.getListaPazienti();
  }

  /**
   * 4 api
   *
   * - LISTA-PZ
   * - ACCETTA-PZ
   * - TRAFERISCI-PZ
   * - DIMETTI-PZ
   */

  getListaPazienti(value? : string): void {
    value = value?.trim() || '';
    this.#http
      .get<HttpRes>(`${this.#URL}/lista-pz/${value}`)
      .pipe(retry(3))
      .subscribe((pazienti) => {this.#listaPz.set(pazienti.body as ListaPazienti);
        // this.#filteredPz.set(pazienti.body as ListaPazienti);
      });
  }

  accettaPaziente(pz: CreazionePaziente): void {
    this.#http
      .post<HttpRes>(`${this.#URL}/accetta-pz`, pz)
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe((data) => {
        if (data.state === 'KO') console.error(data.error);
        this.#router.navigate(['/lista-pz']);
      });
  }

  traferisciPaziente(idPaziente: number): void {
    this.#http
      .put<HttpRes>(`${this.#URL}/trasferisci-pz/${idPaziente}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe((res) => {
        if (res.state === 'KO') {
          console.error(res.error);
        }
      });
  }

  dimettiPaziente(idPaziente: number): void {
    this.#http
      .delete<HttpRes>(`${this.#URL}/dimetti-pz/${idPaziente}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe((res) => {
        if (res.state === 'KO') {
          console.error(res.error);
        }
      });
  }

  private getProntiSoccorso(): void {
    this.#http.get<any>(`${this.#URL}/lista-ospedali`).subscribe({
      next: (ospedali: any) => {
        this.#listaOspedali.set(ospedali.body as OspedaliModel[]);
      },
      error: (err: any) => {
        console.error('Errore nel recupero degli ospedali:', err);
      },
    });
  }

  getListaReparti(id: number): void {
    if (!id) {
      this.#listaReparti.set([]);
      return;
    }

    this.#http.get<any>(`${this.#URL}/lista-reparti/${id}`).subscribe({
      next: (reparti: any) => {
        this.#listaReparti.set(reparti.body);
      },
      error: (err: any) => {
        console.error('Errore nel recupero degli ospedali:', err);
      },
    });
  }
}
