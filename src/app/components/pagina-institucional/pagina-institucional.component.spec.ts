import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInstitucionalComponent } from './pagina-institucional.component';

describe('PaginaInstitucionalComponent', () => {
  let component: PaginaInstitucionalComponent;
  let fixture: ComponentFixture<PaginaInstitucionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PaginaInstitucionalComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
