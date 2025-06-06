import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { Paziente } from '../../models/Paziente.model';

@Component({
  selector: 'app-paziente-list-item',
  imports: [CommonModule],
  templateUrl: './paziente-list-item.component.html',
  styleUrl: './paziente-list-item.component.css'
})
export class PazienteListItemComponent implements OnInit {

  paziente = input.required<Paziente>();
  outPaziente = output<Paziente>();

  ngOnInit(): void {
    
  }
  cambiaStato() {
    this.outPaziente.emit(this.paziente());
  }

}
