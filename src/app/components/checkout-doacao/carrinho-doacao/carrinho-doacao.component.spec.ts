import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoDoacaoComponent } from './carrinho-doacao.component';

describe('CarrinhoDoacaoComponent', () => {
  let component: CarrinhoDoacaoComponent;
  let fixture: ComponentFixture<CarrinhoDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CarrinhoDoacaoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
