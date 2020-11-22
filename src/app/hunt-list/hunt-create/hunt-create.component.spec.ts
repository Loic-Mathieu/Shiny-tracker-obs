import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntCreateComponent } from './hunt-create.component';

describe('HuntCreateComponent', () => {
  let component: HuntCreateComponent;
  let fixture: ComponentFixture<HuntCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuntCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
