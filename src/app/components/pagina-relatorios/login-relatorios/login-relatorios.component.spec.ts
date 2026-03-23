import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRelatoriosComponent } from './login-relatorios.component';

describe('LoginRelatoriosComponent', () => {
  let component: LoginRelatoriosComponent;
  let fixture: ComponentFixture<LoginRelatoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [LoginRelatoriosComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
