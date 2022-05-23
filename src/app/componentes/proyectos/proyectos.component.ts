import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  myPorfolio:any = [];

  faTimes = faTimes;

  constructor(private dataPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.dataPorfolio.getDatos().subscribe(data => {
      this.myPorfolio = data;
    })
  }

}
