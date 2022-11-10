import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountSettingsComponent } from './employee-account-settings.component';

describe('EmployeeAccountSettingsComponent', () => {
  let component: EmployeeAccountSettingsComponent;
  let fixture: ComponentFixture<EmployeeAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAccountSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
