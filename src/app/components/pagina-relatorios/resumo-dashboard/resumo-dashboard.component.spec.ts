import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoDashboardComponent } from './resumo-dashboard.component';

describe('ResumoDashboardComponent', () => {
  let component: ResumoDashboardComponent;
  let fixture: ComponentFixture<ResumoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ResumoDashboardComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
