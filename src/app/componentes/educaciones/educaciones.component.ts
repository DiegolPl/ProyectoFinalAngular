import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-educaciones',
  templateUrl: './educaciones.component.html',
  styleUrls: ['./educaciones.component.css']
})
export class EducacionesComponent implements OnInit {

  miPorfolio:any = [];
  faTimes = faTimes;

  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.getDatos().subscribe(data => {
      this.miPorfolio = data;
    })
  }

  // Apertura y cierre de ventana modal de agregar nueva educacion
  abrirModalNew(){
    document.getElementById('modal-edit-educacion')?.classList.toggle('modal-ventana-active');
  }

  cerrarModalNew(){
    document.getElementById('modal-edit-educacion')?.classList.toggle('modal-ventana-active');
  }
  
  // Mostrar los botones al clickear en "habilitar edits"
  showBtnEdit(){
    document.getElementById('btn-educacion-add')?.classList.toggle('edit-btn-add-block');

    let elementos = document.querySelectorAll('.educacion .container-seccion .box-seccion')
    for(let i = 0; i < elementos.length; i++){
        elementos[i].children[0].classList.toggle('box-edit-flex')
    }

    this.activarBtnsEditEducacion();
  }

  // Editar elemento
  editElemEducacion(el:any){
    let boxPadreAEditar = el.parentNode.parentNode;
        let datos = {
            fecha: boxPadreAEditar.children[1].children[0].textContent,
            instituto: boxPadreAEditar.children[1].children[1].textContent,
            titulo: boxPadreAEditar.children[2].children[0].textContent,
            descripcion: boxPadreAEditar.children[2].children[1].textContent
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
        creadorBoxInputs('fecha-educ','Fecha: ', datos.fecha);
        creadorBoxInputs('instituto','Instituto: ', datos.instituto);
        creadorBoxInputs('titulo','Titulo: ', datos.titulo);
        creadorBoxInputs('descripcion','Descripcion: ', datos.descripcion);

        // Boton
        let boton = document.createElement('INPUT');
        boton.classList.add('form-login-btn');
        boton.setAttribute('id',`name-boton-edit-educacion`);
        boton.setAttribute('type',`button`);
        boton.setAttribute('value',`Editar`);
        formulario.appendChild(boton);

        boton.addEventListener('click',()=>{
            let inputFecha = document.getElementById('name-input-fecha-educ') as HTMLInputElement;
            let inputInstituto = document.getElementById('name-input-instituto') as HTMLInputElement;
            let inputTitulo = document.getElementById('name-input-titulo') as HTMLInputElement;
            let inputDescripcion = document.getElementById('name-input-descripcion') as HTMLInputElement;

            boxPadreAEditar.children[1].children[0].innerHTML = inputFecha.value;
            boxPadreAEditar.children[1].children[1].innerHTML = inputInstituto.value;
            boxPadreAEditar.children[2].children[0].innerHTML = inputTitulo.value;
            boxPadreAEditar.children[2].children[1].innerHTML = inputDescripcion.value;
            // ventanaModal.classList.remove('modal-ventana-active');
            ventanaModal.remove();
        })
  }

  // Activar edicion en los botones
  activarBtnsEditEducacion(){
    let arrBtnDeleteEducacion = document.querySelectorAll('.btn-delete-educacion');

    for(let i = 0; i < arrBtnDeleteEducacion.length; i++){
        arrBtnDeleteEducacion[i].addEventListener('click', ()=>{
            // let boxPadreAEliminar = arrBtnDeleteEducacion[i]!.parentNode!.parentNode;
            // boxPadreAEliminar!.remove();
            let boxPadreAEliminar = arrBtnDeleteEducacion[i]!.parentNode!.parentNode;
            let padreDelPadre = boxPadreAEliminar!.parentNode;
            padreDelPadre!.removeChild(boxPadreAEliminar!);
        })
    }

    // ---------------------------------------------- BOTON EDITAR EDUCACION ----------------------------------------------

    let arrBtnEditEducacion = document.querySelectorAll('.btn-edit-educacion');

    for(let i = 0; i < arrBtnEditEducacion.length; i++){
        arrBtnEditEducacion[i].addEventListener('click', ()=>{
            this.editElemEducacion(arrBtnEditEducacion[i]);
            //editElemEducacion(arrBtnEditEducacion[i]);
            
        })
    }
  }

  // Agregar nueva educacion
  addNewEducacion(){
    let inputFecha = document.getElementById('new-input-educacion-fecha') as HTMLInputElement;
    let inputInstituto = document.getElementById('new-input-educacion-instituto') as HTMLInputElement;
    let inputTitulo = document.getElementById('new-input-educacion-titulo') as HTMLInputElement;
    let inputDescripcion = document.getElementById('new-input-educacion-descripcion') as HTMLInputElement;

    if(inputFecha.value === '' || inputInstituto.value === '' || inputTitulo.value === '' || inputDescripcion.value === ''){
      return alert('No debes dejar campos vacios')
    }

    this.miPorfolio.educacion.unshift({
      "nombre": inputInstituto.value,
      "fecha": inputFecha.value,
      "titulo": inputTitulo.value,
      "descripcion-curso": inputDescripcion.value
    })

    document.getElementById('modal-edit-educacion')?.classList.toggle('modal-ventana-active');
    inputFecha.value = "";
    inputInstituto.value = "";
    inputTitulo.value = "";
    inputDescripcion.value = "";
  }

}
