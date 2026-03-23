import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRelatoriosComponent } from './menu-relatorios.component';

describe('MenuRelatoriosComponent', () => {
  let component: MenuRelatoriosComponent;
  let fixture: ComponentFixture<MenuRelatoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [MenuRelatoriosComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
