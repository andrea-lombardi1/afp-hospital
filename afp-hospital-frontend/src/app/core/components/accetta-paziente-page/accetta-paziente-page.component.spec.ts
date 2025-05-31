import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccettaPazientePageComponent } from './accetta-paziente-page.component';

describe('AccettaPazientePageComponent', () => {
  let component: AccettaPazientePageComponent;
  let fixture: ComponentFixture<AccettaPazientePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccettaPazientePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccettaPazientePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
