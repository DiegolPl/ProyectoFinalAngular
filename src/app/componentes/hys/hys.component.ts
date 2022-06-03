import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {

  myPorfolio:any = [];

  faTimes = faTimes;

  constructor(private datosPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.getDatos().subscribe(data => {
      this.myPorfolio = data;
    })
  }

  abrirModalNew(){
    document.getElementById('modal-edit-hys')?.classList.toggle('modal-ventana-active');
  }

  cerrarModalNew(){
    document.getElementById('modal-edit-hys')?.classList.toggle('modal-ventana-active');
  }

  editElemHys(el:any){
    let boxPadreAEditar = el!.parentNode!.parentNode;

        let nombreElemento = boxPadreAEditar!.children[1].textContent;
    
        let habilidades = this.myPorfolio.hys;

        let indiceElemento = this.myPorfolio.hys.findIndex((elem: any) => elem.nombre === nombreElemento);
        
        let datos = {
          nombre: habilidades[indiceElemento].nombre,
          style: habilidades[indiceElemento].style
        }
        let porcentajeValor = datos.style.match(/\d+/);

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
        function creadorBoxInputs(id:any, nameLabel:any,value:any){

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
      creadorBoxInputs('name-skill','Skill: ', datos.nombre);
      creadorBoxInputs('porcentaje-skill','Porcentaje: ', porcentajeValor);

      // Boton
      let boton = document.createElement('INPUT');
      boton.classList.add('form-login-btn');
      boton.setAttribute('id','name-boton-edit-hys');
      boton.setAttribute('type','button');
      boton.setAttribute('value','Editar');
      formulario.appendChild(boton);

      boton.addEventListener('click',()=>{
          let inputName = document.getElementById('name-input-name-skill') as HTMLInputElement;
          habilidades[indiceElemento].nombre = inputName.value;
          let inputSkill = document.getElementById('name-input-porcentaje-skill') as HTMLInputElement;
          habilidades[indiceElemento].style = `width: ${inputSkill.value}%`;
          // ventanaModal.classList.remove('modal-ventana-active');
          ventanaModal.remove();
      })
  }

  activarBtnsEditHys() {
    // ---------------------------------------------- BOTON ELIMINAR HYS ----------------------------------------------

    let arrBtnDeleteHys = document.querySelectorAll('.btn-delete-hys');

    for(let i = 0; i < arrBtnDeleteHys.length; i++){
        arrBtnDeleteHys[i].addEventListener('click', ()=>{
            let boxPadreAEliminar = arrBtnDeleteHys[i]!.parentNode!.parentNode;
            let padreDelPadre = boxPadreAEliminar!.parentNode;
            padreDelPadre!.removeChild(boxPadreAEliminar!);
        })
    }

    // ---------------------------------------------- BOTON EDITAR HYS ----------------------------------------------

    let arrBtnEditHys = document.querySelectorAll('.btn-edit-hys');

    for(let i = 0; i < arrBtnEditHys.length; i++){
      arrBtnEditHys[i].addEventListener('click', ()=>{
        this.editElemHys(arrBtnEditHys[i]);
      })
    }
  }

  flagTest: boolean = true;
  showBtnEdits(){
    document.getElementById('btn-hys-add')?.classList.toggle('edit-btn-add-block');
  
    let elementos = document.querySelectorAll('.hys .container-seccion .box-seccion')
    for(let i = 0; i < elementos.length; i++){
        elementos[i].children[0].classList.toggle('box-edit-flex')
    }
    if(this.flagTest){
      this.activarBtnsEditHys();
      this.flagTest = false;
    }
   }

     // Agregar nueva habilidad
  addNewHys(){
    let inputSkill = document.getElementById('new-input-hys-skill') as HTMLInputElement;
    let inputPorcentaje = document.getElementById('new-input-hys-porcentaje') as HTMLInputElement;

    if(inputSkill.value === '' || inputPorcentaje.value === ''){
      return alert('No debes dejar campos vacios')
    }

    this.myPorfolio.hys.push({
      "nombre": inputSkill.value,
      "style": `width: ${inputPorcentaje.value}%`,
      "id": `skill-${inputSkill.value.toLowerCase()}`
    })

    document.getElementById('modal-edit-hys')?.classList.toggle('modal-ventana-active');
    inputSkill.value = "";
    inputPorcentaje.value = "";
  }

  upgradeHys(){
    this.addNewHys()
    setTimeout(()=>{
      let elementos = document.querySelectorAll('.hys .container-seccion .box-seccion')
      for(let i = 0; i < elementos.length; i++){
        if(!elementos[i].children[0].className.includes('box-edit-flex')){
          elementos[i].children[0].classList.add('box-edit-flex');
        }
      }
      elementos[elementos.length - 1].children[0].children[0].addEventListener('click',()=>{
        this.editElemHys(elementos[elementos.length - 1].children[0].children[0]);
      })
      elementos[elementos.length - 1].children[0].children[1].addEventListener('click',()=>{
        let boxPadreAEliminar = elementos[elementos.length - 1].children[0].children[1]!.parentNode!.parentNode;
        let padreDelPadre = boxPadreAEliminar!.parentNode;
        padreDelPadre!.removeChild(boxPadreAEliminar!);
      })
    },500)
   
  }
}
