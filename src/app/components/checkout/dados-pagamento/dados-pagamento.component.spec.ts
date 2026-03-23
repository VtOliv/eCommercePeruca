import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPagamentoComponent } from './dados-pagamento.component';

describe('DadosPagamentoComponent', () => {
  let component: DadosPagamentoComponent;
  let fixture: ComponentFixture<DadosPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [DadosPagamentoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
