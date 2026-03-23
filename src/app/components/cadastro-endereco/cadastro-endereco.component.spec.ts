import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEnderecoComponent } from './cadastro-endereco.component';

describe('CadastroEnderecoComponent', () => {
  let component: CadastroEnderecoComponent;
  let fixture: ComponentFixture<CadastroEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [CadastroEnderecoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
