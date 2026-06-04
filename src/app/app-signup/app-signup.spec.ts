import { TestBed } from '@angular/core/testing';
import { AppSignupComponent } from './app-signup';

describe('AppSignupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSignupComponent]
    }).compileComponents();
  });

  it('should create the signup component', () => {
    const fixture = TestBed.createComponent(AppSignupComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
