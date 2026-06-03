import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppCadastro } from './app-cadastro';

describe('AppCadastro', () => {
  let component: AppCadastro;
  let fixture: ComponentFixture<AppCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
