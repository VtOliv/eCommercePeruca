import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCheckoutComponent } from './nav-checkout.component';

describe('NavCheckoutComponent', () => {
  let component: NavCheckoutComponent;
  let fixture: ComponentFixture<NavCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [NavCheckoutComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
