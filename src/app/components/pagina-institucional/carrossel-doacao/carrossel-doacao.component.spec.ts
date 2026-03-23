import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselDoacaoComponent } from './carrossel-doacao.component';

describe('CarrosselDoacaoComponent', () => {
  let component: CarrosselDoacaoComponent;
  let fixture: ComponentFixture<CarrosselDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CarrosselDoacaoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
