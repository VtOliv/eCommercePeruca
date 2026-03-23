import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoDoarComponent } from './como-doar.component';

describe('ComoDoarComponent', () => {
  let component: ComoDoarComponent;
  let fixture: ComponentFixture<ComoDoarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ComoDoarComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoDoarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
