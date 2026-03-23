import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarDoacaoComponent } from './finalizar-doacao.component';

describe('FinalizarDoacaoComponent', () => {
  let component: FinalizarDoacaoComponent;
  let fixture: ComponentFixture<FinalizarDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FinalizarDoacaoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
