export interface Paziente {
  id_paziente: number;
  codice: string;
  codice_colore: CodiceColore;
  stato: StatoPZ;
  id_reparto: number;
  nome_reparto: string;
  descrizione: string;
  id_anagrafica: number;
  nome: string;
  cognome: string;
  data_nascita: Date;
  codice_fiscale: string;
  data_inserimento: Date;
  nome_ospedale?: string;
  id_ospedale?: number;
}

export interface ListaPazienti {
  ROSSO: Paziente[];
  ARANCIONE: Paziente[];
  AZZURRO: Paziente[];
  VERDE: Paziente[];
  BIANCO: Paziente[];
}

export interface CreazionePaziente {
  nome: string;
  cognome: string;
  dataNascita: Date;
  codiceFiscale: string;
  codiceColore: CodiceColore;
  stato: StatoPZ;
  ospedaleId: number;
  repartoId: number;
}

export enum CodiceColore {
  BIANCO = "BIANCO",
  VERDE = "VERDE",
  AZZURRO = "AZZURRO",
  ARANCIONE = "ARANCIONE",
  ROSSO = "ROSSO",
}

export enum StatoPZ {
  IN_CARICO = 'IN CARICO',
  TRASFERITO = 'TRASFERITO',
  IN_ATTESA = 'IN ATTESA',
  DIMESSO = 'DIMESSO',
}
