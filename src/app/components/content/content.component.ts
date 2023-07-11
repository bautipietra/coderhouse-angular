import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  alumnoModel: FormGroup;
  alumnos: string[] = ['Ejemplo Correcto', 'Ejemplo 1nc0rr3ct0'];

  constructor() {
    this.alumnoModel = new FormGroup({
      alumno: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])
    });
  }

  onSave(): void {
    if (this.alumnoModel.valid) {
      this.alumnos.push(this.alumnoModel.value.alumno);
    }
  }

  getControlErrorMessage(controlName: string): string {
  const control = this.alumnoModel.get(controlName);
  if (control && control.touched && control.invalid) {
    if (control.errors?.['required']) {
      return 'El campo es requerido';
    }
    if (control.errors?.['minlength']) {
      return `El campo debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors?.['maxlength']) {
      return `El campo debe tener como máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    }
  }
  return '';
}
}