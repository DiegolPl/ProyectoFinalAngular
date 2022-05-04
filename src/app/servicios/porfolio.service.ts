import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor() { }

  getDatos(){
    alert('El servicio Portfolio esta andando joya');
  }
}
