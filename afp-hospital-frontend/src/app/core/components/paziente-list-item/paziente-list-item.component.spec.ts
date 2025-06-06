import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PazienteListItemComponent } from './paziente-list-item.component';

describe('PazienteListItemComponent', () => {
  let component: PazienteListItemComponent;
  let fixture: ComponentFixture<PazienteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PazienteListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PazienteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
