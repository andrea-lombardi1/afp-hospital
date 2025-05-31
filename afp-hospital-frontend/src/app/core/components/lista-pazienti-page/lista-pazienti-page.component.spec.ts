import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPazientiPageComponent } from './lista-pazienti-page.component';

describe('ListaPazientiPageComponent', () => {
  let component: ListaPazientiPageComponent;
  let fixture: ComponentFixture<ListaPazientiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPazientiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPazientiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
