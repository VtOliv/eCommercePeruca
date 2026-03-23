import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDoacaoComponent } from './checkout-doacao.component';

describe('CheckoutDoacaoComponent', () => {
  let component: CheckoutDoacaoComponent;
  let fixture: ComponentFixture<CheckoutDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CheckoutDoacaoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
