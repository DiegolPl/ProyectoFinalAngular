import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {

  myPorfolio:any;

  faTimes = faTimes;

  constructor(private datosPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.getDatos().subscribe(data => {
      this.myPorfolio = data;
    })
  }

}
