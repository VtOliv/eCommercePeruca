import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaEnvioComponent } from './forma-envio.component';

describe('FormaEnvioComponent', () => {
  let component: FormaEnvioComponent;
  let fixture: ComponentFixture<FormaEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FormaEnvioComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
