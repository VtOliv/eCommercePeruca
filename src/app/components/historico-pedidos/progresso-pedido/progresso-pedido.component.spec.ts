import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoPedidoComponent } from './progresso-pedido.component';

describe('ProgressoPedidoComponent', () => {
  let component: ProgressoPedidoComponent;
  let fixture: ComponentFixture<ProgressoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ProgressoPedidoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
