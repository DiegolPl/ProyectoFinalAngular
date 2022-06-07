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

  

  flagTest: boolean = true;
  showBtnEdit(){
    document.getElementById('btn-proyecto-add')?.classList.toggle('edit-btn-add-block');

    let elementos = document.querySelectorAll('.proyecto .container-seccion .card-proyecto')
    for(let i = 0; i < elementos.length; i++){
        elementos[i].children[0].classList.toggle('box-edit-flex')
    }
    if(this.flagTest){
      this.activarBtnsEditProyecto();
      this.flagTest = false;
    }
  }
  
  // Activar edicion en los botones
  activarBtnsEditProyecto(){
    let arrBtnDeleteProyecto = document.querySelectorAll('.btn-delete-proyecto');
    // alert('Ready');
    
    for(let i = 0; i < arrBtnDeleteProyecto.length; i++){
      arrBtnDeleteProyecto[i].addEventListener('click', ()=>{
            // let boxPadreAEliminar = arrBtnDeleteProyecto[i]!.parentNode!.parentNode;
            // boxPadreAEliminar!.remove();
            let boxPadreAEliminar = arrBtnDeleteProyecto[i]!.parentNode!.parentNode;
            let padreDelPadre = boxPadreAEliminar!.parentNode;
            padreDelPadre!.removeChild(boxPadreAEliminar!);
        })
    }

    // ---------------------------------------------- BOTON EDITAR EDUCACION ----------------------------------------------

    let arrBtnEditProyecto = document.querySelectorAll('.btn-edit-proyecto');

    for(let i = 0; i < arrBtnEditProyecto.length; i++){
        arrBtnEditProyecto[i].addEventListener('click', ()=>{
            //this.editElemProyecto(arrBtnEditProyecto[i]);
            //editElemProyecto(arrBtnEditProyecto[i]);
            
        })
    }
  }

}
