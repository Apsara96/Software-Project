import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevProComponent } from './admin-dev-pro.component';

describe('AdminDevProComponent', () => {
  let component: AdminDevProComponent;
  let fixture: ComponentFixture<AdminDevProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDevProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDevProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
