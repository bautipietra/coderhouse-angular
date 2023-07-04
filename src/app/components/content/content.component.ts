import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  alumnos: string[] = ['Ejemplo Correcto', "Ejemplo 1nc0rr3ct0"];
  alumnoNuevo: string = '';
  
  onInputChange(event: KeyboardEvent): void {
    const htmlInput = event.target as HTMLInputElement;
    this.alumnoNuevo = htmlInput?.value
  }

  onSave(): void {
    this.alumnos.push(this.alumnoNuevo);
  }
}
