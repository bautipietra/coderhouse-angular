import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  alumnoModel: FormGroup;
  alumnos: Student[] = [];
  dataSource: MatTableDataSource<Student>;

  // Arreglo de nombres de columnas para la tabla
  displayedColumns: string[] = ['fullName', 'age', 'mail', 'actions'];

  constructor() {
    this.alumnoModel = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(99),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
    });

    this.dataSource = new MatTableDataSource(this.alumnos);
  }

  onSave(): void {
    if (this.alumnoModel.valid) {
      const newStudent: Student = this.alumnoModel.value;
      this.alumnos.push(newStudent);
      this.dataSource.data = this.alumnos;
      this.alumnoModel.reset(); // Limpiar el formulario después de agregar un estudiante
    }
    else {
      alert('El formulario no es válido');
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
      if (control.errors?.['min'] || control.errors?.['max']) {
        return `La edad debe estar entre 18 y 99 años`;
      }
      if (control.errors?.['email']) {
        return 'El formato del correo electrónico es inválido';
      }
    }
    return '';
  }

openEditDialog(student: Student): void {
  const newName = prompt('Editar nombre:', student.name);
  const newSurname = prompt('Editar apellido:', student.surname);
  const newAge = prompt('Editar edad:', student.age?.toString() || '');
  const newMail = prompt('Editar correo electrónico:', student.mail);

  if (newName !== null && newSurname !== null && newAge !== null && newMail !== null) {
    const editedStudent: Student = {
      ...student,
      name: newName.trim(),
      surname: newSurname.trim(),
      age: +newAge, // Convertir a número
      mail: newMail.trim()
    };

    const index = this.alumnos.findIndex((s) => s === student);
    this.alumnos[index] = editedStudent;

    // Actualizar la fuente de datos dataSource
    this.dataSource.data = this.alumnos.slice();
  }
}

  deleteStudent(student: Student): void {
    const index = this.alumnos.findIndex((s) => s === student);
    if (index !== -1) {
      this.alumnos.splice(index, 1);
      this.dataSource.data = this.alumnos;
    }
  }
}
