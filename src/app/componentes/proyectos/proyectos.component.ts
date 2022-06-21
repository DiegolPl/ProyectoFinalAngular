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
            //this.editElemProyecto(arrBtnEditProyecto[i]);
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
        //this.editElemHys(elementos[elementos.length - 1].children[0].children[0]);
      })
      elementos[elementos.length - 1].children[0].children[1].addEventListener('click',()=>{
        let boxPadreAEliminar = elementos[elementos.length - 1].children[0].children[1]!.parentNode!.parentNode;
        let padreDelPadre = boxPadreAEliminar!.parentNode;
        padreDelPadre!.removeChild(boxPadreAEliminar!);
      })
      elementos[elementos.length - 1].removeAttribute('href');
    },500)
   
  }
}
