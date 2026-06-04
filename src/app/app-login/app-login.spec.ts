import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLogin } from './app-login';

describe('AppLogin', () => {
  let component: AppLogin;
  let fixture: ComponentFixture<AppLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
