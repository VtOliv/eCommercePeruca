import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavRelatoriosComponent } from './nav-relatorios.component';

describe('NavRelatoriosComponent', () => {
  let component: NavRelatoriosComponent;
  let fixture: ComponentFixture<NavRelatoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [NavRelatoriosComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
