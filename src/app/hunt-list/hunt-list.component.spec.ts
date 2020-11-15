import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntListComponent } from './hunt-list.component';

describe('HuntListComponent', () => {
  let component: HuntListComponent;
  let fixture: ComponentFixture<HuntListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuntListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
