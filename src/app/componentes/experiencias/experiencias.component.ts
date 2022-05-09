import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  miPorfolio:any;
  faTimes = faTimes;

  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.getDatos().subscribe(data => {
      this.miPorfolio = data;
    })
  }

  abrirModalNew(){
    document.getElementById('modal-edit-experiencia')?.classList.toggle('modal-ventana-active');
  }

  cerrarModalNew(){
    document.getElementById('modal-edit-experiencia')?.classList.toggle('modal-ventana-active');
  }

  // Despues tengo q hacer que agregue el elemento dentro del array de experiencia en el JSON y lo de eliminar tbn
  addNewExperiencia() {
    //Validacion de inputs vacios
    let inputFecha = document.getElementById('new-input-experiencia-fecha') as HTMLInputElement;
    let inputLugar = document.getElementById('new-input-experiencia-lugar') as HTMLInputElement;
    let inputOcupacion = document.getElementById('new-input-experiencia-ocupacion') as HTMLInputElement;
    let inputDescripcion = document.getElementById('new-input-experiencia-descripcion') as HTMLInputElement;
    if(inputFecha.value === '' || inputLugar.value === '' || inputOcupacion.value === '' || inputDescripcion.value === ''){
      return alert('No debes dejar campos vacios')
    }

    // Creacion de nueva exp
    let containerPadre: HTMLElement = document.getElementById(`container-experiencia`)!;
    // Contenedor de nuevo elemento
    let boxSeccion = document.createElement('DIV');
    boxSeccion.classList.add('box-seccion');
    containerPadre.prepend(boxSeccion);
    // Contenedor de botones de edit
    let boxEdit = document.createElement('DIV');
    boxEdit.classList.add('box-edit');
    boxEdit.classList.add('box-edit-flex');
    boxSeccion.appendChild(boxEdit);
    // boton edit
    let btnEdit = document.createElement('SPAN');
    btnEdit.classList.add('material-icons');
    btnEdit.classList.add('material-icons-outlined');
    btnEdit.classList.add('btn-edit');
    btnEdit.classList.add(`btn-edit-experiencia`);
    let textoBtnEdit = document.createTextNode('edit');
    btnEdit.appendChild(textoBtnEdit);
    boxEdit.appendChild(btnEdit);
    // Funcion boton edit
    btnEdit.addEventListener('click',()=>{
      //editElemEducacion(btnEdit);
    })
    // boton delete
    let btnDelete: HTMLElement = document.createElement('SPAN')!;
    btnDelete.classList.add('material-icons');
    btnDelete.classList.add('material-icons-outlined');
    btnDelete.classList.add('btn-delete');
    btnDelete.classList.add(`btn-delete-experiencia`);
    let textoBtnDelete = document.createTextNode('cancel');
    btnDelete.appendChild(textoBtnDelete);
    boxEdit.appendChild(btnDelete);
    // Funcion boton delete
    btnDelete.addEventListener('click', ()=>{
      let boxPadreAEliminar = btnDelete!.parentNode!.parentNode;
      let padreDelPadre = boxPadreAEliminar!.parentNode;
      padreDelPadre!.removeChild(boxPadreAEliminar!);
      // if(orderSeccion === 'orderEducacion'){
      //     orderEducacion();
      // }
      // if(orderSeccion === 'orderExperiencia'){
      //     orderExperiencia();
      // }
    })
    // Contenedor de lado izquierdo
    let boxLadoIzq = document.createElement('DIV');
    boxLadoIzq.classList.add('box-lado-izq');
    boxSeccion.appendChild(boxLadoIzq);
    // Fecha - PrimeroIzq
    let primeroIzq = document.createElement('H3');
    let textoPrimeroIzq = document.createTextNode(inputFecha.value);
    primeroIzq.appendChild(textoPrimeroIzq);
    boxLadoIzq.appendChild(primeroIzq);
    // Instituto - SegundoIzq
    let segundoIzq = document.createElement('H4');
    let textoSegundoIzq = document.createTextNode(inputLugar.value);
    segundoIzq.appendChild(textoSegundoIzq);
    boxLadoIzq.appendChild(segundoIzq);
    // Contenedor de lado derecho
    let boxLadoDcho = document.createElement('DIV');
    boxLadoDcho.classList.add('box-lado-dcho');
    boxSeccion.appendChild(boxLadoDcho);
    // Titulo - PrimeroDcha
    let primeroDcha = document.createElement('H3');
    let textoPrimeroDcha = document.createTextNode(inputOcupacion.value);
    primeroDcha.appendChild(textoPrimeroDcha);
    boxLadoDcho.appendChild(primeroDcha);
    // Descripcion - SegundoDcha
    let segundoDcha = document.createElement('H4');
    let textoSegundoDcha = document.createTextNode(inputDescripcion.value);
    segundoDcha.appendChild(textoSegundoDcha);
    boxLadoDcho.appendChild(segundoDcha);
    document.getElementById(`modal-edit-experiencia`)?.classList.toggle('modal-ventana-active');
    inputFecha.value = '';
    inputLugar.value = '';
    inputOcupacion.value = '';
    inputDescripcion.value = '';
  }
 
  activarBtnsEditExperiencia() {
    // ---------------------------------------------- BOTON ELIMINAR EXPERIENCIA ----------------------------------------------

    let arrBtnDeleteExperiencia = document.querySelectorAll('.btn-delete-experiencia');

    for(let i = 0; i < arrBtnDeleteExperiencia.length; i++){
        arrBtnDeleteExperiencia[i].addEventListener('click', ()=>{
            //let boxPadreAEliminar = arrBtnDeleteExperiencia[i]!.parentNode!.parentNode;
            //boxPadreAEliminar.remove();
            let boxPadreAEliminar = arrBtnDeleteExperiencia[i]!.parentNode!.parentNode;
            let padreDelPadre = boxPadreAEliminar!.parentNode;
            padreDelPadre!.removeChild(boxPadreAEliminar!);
        })
    }

    // ---------------------------------------------- BOTON EDITAR EXPERIENCIA ----------------------------------------------

    let arrBtnEditExperiencia = document.querySelectorAll('.btn-edit-experiencia');

    for(let i = 0; i < arrBtnEditExperiencia.length; i++){
        arrBtnEditExperiencia[i].addEventListener('click', ()=>{

            //editElemEducacion(arrBtnEditExperiencia[i]);
            
        })
    }

}

 showBtnEdits(){
  document.getElementById('btn-experiencia-add')?.classList.toggle('edit-btn-add-block');

  let elementos = document.querySelectorAll('.experiencia .container-seccion .box-seccion')
  for(let i = 0; i < elementos.length; i++){
      elementos[i].children[0].classList.toggle('box-edit-flex')
  }
  this.activarBtnsEditExperiencia();
 }
  // Nuevo
  // for(_indice = 0; i < Math.round((this.miPorfolio.experiencias.length) / 2) - 1; i++){
  //   this.experienciasLadoIzquierdo.push(this.miPorfolio.experiencias[i]);
  // };
  // for(let i = Math.round((this.miPorfolio.experiencias.length) / 2); i < this.miPorfolio.experiencias.length; i++){
  //   this.experienciasLadoDerecho.push(this.miPorfolio.experiencias[i]);
  // };

  // orderElements(){
  //   let mitadArray = Math.round((this.miPorfolio.experiencias.length) / 2);
  //   let experienciasLadoIzquierdo = [];
  //   let experienciasLadoDerecho = [];
  //   for(let i = 0; i < mitadArray - 1; i++){
  //     experienciasLadoIzquierdo[i] = this.miPorfolio.experiencias[i] ;
  //   }
  //   this.experienciasLadoIzquierdo = experienciasLadoIzquierdo;
  //   for(let i = mitadArray; i < this.miPorfolio.experiencias.length; i++){
  //     experienciasLadoDerecho[i] = this.miPorfolio.experiencias[i] ;
  //   }
  //   this.experienciasLadoDerecho = experienciasLadoDerecho;
  // }
  
}
