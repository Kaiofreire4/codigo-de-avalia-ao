import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppUsuarios } from './usuario';

describe('AppUsuarios', () => {
  let component: AppUsuarios;
  let fixture: ComponentFixture<AppUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(AppUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
