import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Coleccion de futuros eventos a los que nos vamos a suscribir y luego nos llegaran de forma asincrona

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http: HttpClient) { }

  getDatos():Observable<any>{
    return this.http.get("../../assets/data/data.json");
  }
}
