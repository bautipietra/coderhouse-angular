import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // Asegurémonos de que el resultado no sea 'undefined' y realicemos type casting utilizando 'as'
  getDataPromise(): Promise<any[]> {
    return this.http.get<any[]>(this.apiUrl).toPromise()
      .then(data => data as any[]);
  }
}
