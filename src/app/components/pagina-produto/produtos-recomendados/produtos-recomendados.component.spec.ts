import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosRecomendadosComponent } from './produtos-recomendados.component';

describe('ProdutosRecomendadosComponent', () => {
  let component: ProdutosRecomendadosComponent;
  let fixture: ComponentFixture<ProdutosRecomendadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ProdutosRecomendadosComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
