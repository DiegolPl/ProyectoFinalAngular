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
  desactivarEnlaces: boolean = true;
  showBtnEdit(){
    console.log(this.desactivarEnlaces)
    document.getElementById('btn-proyecto-add')?.classList.toggle('edit-btn-add-block');

    //Solucion a problema de redireccion de los enlaces al momento de querer darle a los botones de edit en cada proyecto
    document.querySelectorAll('.proyecto A').forEach(el => el.classList.toggle('pointer-event-none'));
    let arrEnlaces = document.querySelectorAll('.proyecto A');

    if(this.desactivarEnlaces){
      document.querySelectorAll('.proyecto A').forEach(el => el.removeAttribute('href'));
      this.desactivarEnlaces = false;
    }else{
      for(let i = 0; i < arrEnlaces.length; i++){
        arrEnlaces[i].setAttribute('href',`${this.myPorfolio.proyectos[i]["url-proyecto"]}`)
      }
      this.desactivarEnlaces = true;
    }
    //Fin solucion

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
            this.editElemProyecto(arrBtnEditProyecto[i]);
            //editElemProyecto(arrBtnEditProyecto[i]);
            
        })
    }
  }

  abrirModalNew(){
    document.getElementById('modal-edit-proyecto')?.classList.toggle('modal-ventana-active');
  }

  cerrarModalNew(){
    document.getElementById('modal-edit-proyecto')?.classList.toggle('modal-ventana-active');
  }
  
  addNewProyecto(){
    let inputImg = document.getElementById('edit-proyecto-input-img') as HTMLInputElement;
    let inputTitulo = document.getElementById('edit-proyecto-input-titulo') as HTMLInputElement;
    let inputFecha = document.getElementById('edit-proyecto-input-fecha') as HTMLInputElement;
    let inputDescripcion = document.getElementById('edit-proyecto-input-descripcion') as HTMLInputElement;
    let inputLink = document.getElementById('edit-proyecto-input-link') as HTMLInputElement;

    if(inputImg.value === '' || inputTitulo.value === '' || inputDescripcion.value === '' || inputFecha.value === '' || inputLink.value === ''){
      return alert('No debes dejar campos vacios')
    }

     // Si me pasan una ruta para la imagen la cambio x la que esta puesta
     let newSrc;
     if(inputImg.value){
      let valorInputImg = String(inputImg.value);
      let lastSlashInputImg = valorInputImg.lastIndexOf('\\');    //Index del ultimo \
      let lastSlashSrcImgActual = this.myPorfolio.urlImgPerfil.lastIndexOf('/');
      let newSrcParteUno = this.myPorfolio.urlImgPerfil.slice(0, lastSlashSrcImgActual + 1);
      let newSrcParteDos = valorInputImg.slice(lastSlashInputImg + 1, valorInputImg.length);
      newSrc = newSrcParteUno + newSrcParteDos;
      
    }

    this.myPorfolio.proyectos.push({
      "nombre": inputTitulo.value,
      "fecha": inputFecha.value,
      "descripcion": inputDescripcion.value,
      "url-img": newSrc,
      "url-proyecto": inputLink.value
    })

    document.getElementById('modal-edit-proyecto')?.classList.toggle('modal-ventana-active');
    inputImg.value = "";
    inputTitulo.value = "";
    inputFecha.value = "";
    inputDescripcion.value = "";
    inputLink.value = "";
  }

  upgradeProyectos(){
    this.addNewProyecto()

    setTimeout(()=>{
      let elementos = document.querySelectorAll('.proyecto .container-seccion .card-proyecto')
      for(let i = 0; i < elementos.length; i++){
        if(!elementos[i].children[0].className.includes('box-edit-flex')){
          elementos[i].children[0].classList.add('box-edit-flex');
        }
      }
      elementos[elementos.length - 1].children[0].children[0].addEventListener('click',()=>{
        this.editElemProyecto(elementos[elementos.length - 1].children[0].children[0]);
      })
      elementos[elementos.length - 1].children[0].children[1].addEventListener('click',()=>{
        let boxPadreAEliminar = elementos[elementos.length - 1].children[0].children[1]!.parentNode!.parentNode;
        let padreDelPadre = boxPadreAEliminar!.parentNode;
        padreDelPadre!.removeChild(boxPadreAEliminar!);
      })
      elementos[elementos.length - 1].removeAttribute('href');
    },500)
   
  }

  editElemProyecto(el:any){
    alert("Anda")
    let boxPadreAEditar = el!.parentNode!.parentNode;

        let textoNombreElemento = boxPadreAEditar!.children[2].children[0].textContent;
        let indiceUltimoGuion = textoNombreElemento.lastIndexOf('-');
        let nombreElemento = textoNombreElemento.slice(0, indiceUltimoGuion - 1)
    
        let proyectos = this.myPorfolio.proyectos;

        console.log(nombreElemento);
        let indiceElemento = proyectos.findIndex((elem: any) => elem.nombre === nombreElemento);
        console.log(indiceElemento);
        
        let datos = {
          imagen: proyectos[indiceElemento]["url-img"],    //Hay un error en la carga o guardado de la foto
          nombre: proyectos[indiceElemento].nombre,
          fecha: proyectos[indiceElemento].fecha,
          descripcion: proyectos[indiceElemento].descripcion,
          "url-proyecto": proyectos[indiceElemento]["url-proyecto"]
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
        function creadorBoxInputs(id:any, nameLabel:any, value:any, type:any){

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
          input.setAttribute('type',`${type}`);
          input.setAttribute('value',`${value}`);
          box.appendChild(input);
          
      }
      creadorBoxInputs('img-proyecto','Imagen: ', datos.imagen, "file");
      creadorBoxInputs('name-proyecto','Nombre: ', datos.nombre, "text");
      creadorBoxInputs('fecha-proyecto','Fecha: ', datos.fecha, "number");
      creadorBoxInputs('descripcion-proyecto','Descripcion: ', datos.descripcion, "text");
      creadorBoxInputs('link-proyecto','Link: ', datos["url-proyecto"], "text");

      // Boton
      let boton = document.createElement('INPUT');
      boton.classList.add('form-login-btn');
      boton.setAttribute('id','name-boton-edit-hys');
      boton.setAttribute('type','button');
      boton.setAttribute('value','Editar');
      formulario.appendChild(boton);

      

      boton.addEventListener('click',()=>{
          let inputImagen = document.getElementById('name-input-img-proyecto') as HTMLInputElement;
          console.log(inputImagen.value)

          //Correccion de la url de la foto
          let newSrc;
          if(inputImagen.value){
            let valorInputImg = String(inputImagen.value);
            let lastSlashInputImg = valorInputImg.lastIndexOf('\\');    //Index del ultimo \
            let lastSlashSrcImgActual = this.myPorfolio.urlImgPerfil.lastIndexOf('/');
            let newSrcParteUno = this.myPorfolio.urlImgPerfil.slice(0, lastSlashSrcImgActual + 1);
            let newSrcParteDos = valorInputImg.slice(lastSlashInputImg + 1, valorInputImg.length);
            newSrc = newSrcParteUno + newSrcParteDos;
          }
  
          console.log(newSrc);

          proyectos[indiceElemento]["url-img"] = newSrc;
          let inputName = document.getElementById('name-input-name-proyecto') as HTMLInputElement;
          proyectos[indiceElemento].nombre = inputName.value;
          let inputFecha = document.getElementById('name-input-fecha-proyecto') as HTMLInputElement;
          proyectos[indiceElemento].fecha = inputFecha.value;
          let inputDescripcion = document.getElementById('name-input-descripcion-proyecto') as HTMLInputElement;
          proyectos[indiceElemento].descripcion = inputDescripcion.value;
          let inputLink = document.getElementById('name-input-link-proyecto') as HTMLInputElement;
          proyectos[indiceElemento]["url-proyecto"] = inputLink.value;
          // ventanaModal.classList.remove('modal-ventana-active');
          ventanaModal.remove();
      })
  }
}
