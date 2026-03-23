import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhaPerucaComponent } from './escolha-peruca.component';

describe('EscolhaPerucaComponent', () => {
  let component: EscolhaPerucaComponent;
  let fixture: ComponentFixture<EscolhaPerucaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [EscolhaPerucaComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolhaPerucaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
