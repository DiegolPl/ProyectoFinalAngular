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

  editElemExperiencia(el:any){
    // let boxPadreAEditar = arrBtnEditEducacion[i].parentNode.parentNode;
    let boxPadreAEditar = el!.parentNode!.parentNode;
    let datos = {
            fecha: boxPadreAEditar!.children[1].children[0].textContent,
            nombre: boxPadreAEditar!.children[1].children[1].textContent,
            cargo: boxPadreAEditar!.children[2].children[0].textContent,
            descripcion: boxPadreAEditar!.children[2].children[1].textContent
        }

        // Creo la ventana modal
        let ventanaModal = document.createElement('DIV');
        ventanaModal.classList.add('modal-ventana');
        ventanaModal.classList.add('modal-ventana-active');
        document.getElementsByTagName('body')[0].appendChild(ventanaModal);       

        // Creo el formulario de edicion
        let formulario = document.createElement('FORM');
        formulario.classList.add('form-login');
        formulario.classList.add('form-edit');
        ventanaModal.appendChild(formulario);

        // Creacion de titulo
        let titulo = document.createElement('H2');
        titulo.classList.add('form-login-title')
        let textoTitulo = document.createTextNode('Modo edicion!');
        titulo.appendChild(textoTitulo);
        formulario.appendChild(titulo);

        // Creacion de boton close
        let btnCerrar = document.createElement('I');
        btnCerrar.classList.add('fa-solid');
        btnCerrar.classList.add('fa-xmark');
        btnCerrar.classList.add('modal-close-btn');
        formulario.appendChild(btnCerrar);

        // Evento boton close
        btnCerrar.addEventListener('click', ()=>{
            ventanaModal.classList.remove('modal-ventana-active');
            ventanaModal.remove();
        })

        // Creacion de box y sus inputs
        function creadorBoxInputs(id:string, nameLabel:string,value:string){

            // Box container
            let box = document.createElement('DIV');
            box.classList.add('modal-box');   
            box.classList.add('user-box');   
            box.classList.add('modal-box-edit');
            formulario.appendChild(box);
            
            // Label
            let label = document.createElement('LABEL');
            label.classList.add('label-modal');
            label.setAttribute('for',`name-input-${id}`);
            label.setAttribute('id',`name-label-${id}`);
            let textoLabel = document.createTextNode(`${nameLabel}`);
            label.appendChild(textoLabel);
            box.appendChild(label);

            // Input
            let input = document.createElement('INPUT');
            input.classList.add('input-modal');
            input.setAttribute('id',`name-input-${id}`);
            input.setAttribute('type',`text`);
            input.setAttribute('value',`${value}`);
            box.appendChild(input);
            
        }
        creadorBoxInputs('experiencia-fecha','Fecha: ', datos.fecha!);
        creadorBoxInputs('experiencia-nombre','Nombre: ', datos.nombre!);
        creadorBoxInputs('experiencia-cargo','Cargo: ', datos.cargo!);
        creadorBoxInputs('experiencia-descripcion','Descripcion: ', datos.descripcion!);

        // Boton
        let boton = document.createElement('INPUT');
        boton.classList.add('form-login-btn');
        boton.setAttribute('id',`name-boton-edit-experiencia`);
        boton.setAttribute('type',`button`);
        boton.setAttribute('value',`Editar`);
        formulario.appendChild(boton);

        boton.addEventListener('click',()=>{

            let inputFecha = document.getElementById('name-input-experiencia-fecha') as HTMLInputElement;
            let inputNombre = document.getElementById('name-input-experiencia-nombre') as HTMLInputElement;
            let inputCargo = document.getElementById('name-input-experiencia-cargo') as HTMLInputElement;
            let inputDescripcion = document.getElementById('name-input-experiencia-descripcion') as HTMLInputElement;

            boxPadreAEditar!.children[1].children[0].innerHTML = inputFecha.value;
            boxPadreAEditar!.children[1].children[1].innerHTML = inputNombre.value;
            boxPadreAEditar!.children[2].children[0].innerHTML = inputCargo.value;
            boxPadreAEditar!.children[2].children[1].innerHTML = inputDescripcion.value;
            // ventanaModal.classList.remove('modal-ventana-active');
            ventanaModal.remove();
        })
  }

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
      this.editElemExperiencia(btnEdit);
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
            let boxPadreAEliminar = arrBtnDeleteExperiencia[i]!.parentNode!.parentNode;
            let padreDelPadre = boxPadreAEliminar!.parentNode;
            padreDelPadre!.removeChild(boxPadreAEliminar!);
        })
    }

    // ---------------------------------------------- BOTON EDITAR EXPERIENCIA ----------------------------------------------

    let arrBtnEditExperiencia = document.querySelectorAll('.btn-edit-experiencia');

    for(let i = 0; i < arrBtnEditExperiencia.length; i++){
      arrBtnEditExperiencia[i].addEventListener('click', ()=>{
        this.editElemExperiencia(arrBtnEditExperiencia[i]);
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
