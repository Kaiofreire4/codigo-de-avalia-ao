import { TestBed } from '@angular/core/testing';
import { AppLoginComponent } from './app-login';

describe('AppLoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoginComponent]
    }).compileComponents();
  });

  it('should create the login component', () => {
    const fixture = TestBed.createComponent(AppLoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
