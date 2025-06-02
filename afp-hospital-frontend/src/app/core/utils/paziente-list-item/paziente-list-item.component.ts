import { Component, input, OnInit } from '@angular/core';
import { Paziente } from '../../models/Paziente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paziente-list-item',
  imports: [CommonModule],
  templateUrl: './paziente-list-item.component.html',
  styleUrl: './paziente-list-item.component.css'
})
export class PazienteListItemComponent implements OnInit {

  paziente = input.required<Paziente>();

  ngOnInit(): void {
    
  }
}
