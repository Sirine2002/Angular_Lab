import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEvtComponent } from './model-evt.component';

describe('ModelEvtComponent', () => {
  let component: ModelEvtComponent;
  let fixture: ComponentFixture<ModelEvtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelEvtComponent]
    });
    fixture = TestBed.createComponent(ModelEvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
