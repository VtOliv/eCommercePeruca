import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroselHomeComponent } from './carrosel-home.component';

describe('CarroselHomeComponent', () => {
  let component: CarroselHomeComponent;
  let fixture: ComponentFixture<CarroselHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [CarroselHomeComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarroselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
