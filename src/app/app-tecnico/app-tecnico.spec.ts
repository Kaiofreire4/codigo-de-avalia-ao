import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTecnico } from './app-tecnico';

describe('AppTecnico', () => {
  let component: AppTecnico;
  let fixture: ComponentFixture<AppTecnico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTecnico],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTecnico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
