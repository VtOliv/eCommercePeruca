import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFaleConoscoComponent } from './painel-fale-conosco.component';

describe('PainelFaleConoscoComponent', () => {
  let component: PainelFaleConoscoComponent;
  let fixture: ComponentFixture<PainelFaleConoscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PainelFaleConoscoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelFaleConoscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
