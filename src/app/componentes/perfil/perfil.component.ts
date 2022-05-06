import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  miPorfolio:any;
  faTimes = faTimes;

  // Inyectamos el servicio en el componente
  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.getDatos().subscribe(data => {
      this.miPorfolio = data;
    });
  }

  // Accion de abrir el edit de perfil
  abrirEditPerfil(){
    document.getElementById('modal-edit-perfil')?.classList.toggle('modal-ventana-active');
    let inputEditPerfilName = document.getElementById('edit-perfil-input-name') as HTMLInputElement;
    let inputEditPerfilTitle = document.getElementById('edit-perfil-input-title') as HTMLInputElement;
    
    // Valor inicial de inputs
    inputEditPerfilName.value = this.miPorfolio.name;
    inputEditPerfilTitle.value = this.miPorfolio.titulo;
  }
  
  // Accion de cerrar el edit de perfil
  cerrarEditPerfil(){
    document.getElementById('modal-edit-perfil')?.classList.toggle('modal-ventana-active');
  }

  // Accion de tomar los valores del form y actualizar los valores
  updatePerfil(){
    // Guardo los inputs en variables
    let inputEditPerfilImg = document.getElementById('edit-perfil-input-img') as HTMLInputElement;
    let inputEditPerfilName = document.getElementById('edit-perfil-input-name') as HTMLInputElement;
    let inputEditPerfilTitle = document.getElementById('edit-perfil-input-title') as HTMLInputElement;

    // Compruebo de que no haya inputs vacios
    if(inputEditPerfilImg.value === '' || inputEditPerfilName.value === '' || inputEditPerfilTitle.value === ''){
      return alert('No debes dejar campos vacios')
    }

    // Si me pasan una ruta para la imagen la cambio x la que esta puesta
    if(inputEditPerfilImg.value){
      let valorInputImg = String(inputEditPerfilImg.value);
      let lastSlashInputImg = valorInputImg.lastIndexOf('\\');    //Index del ultimo \
      let lastSlashSrcImgActual = this.miPorfolio.urlImgPerfil.lastIndexOf('/');
      let newSrcParteUno = this.miPorfolio.urlImgPerfil.slice(0, lastSlashSrcImgActual + 1);
      let newSrcParteDos = valorInputImg.slice(lastSlashInputImg + 1, valorInputImg.length);
      let newSrc = newSrcParteUno + newSrcParteDos;
      
      this.miPorfolio.urlImgPerfil = newSrc;
    }
    // Upgradeo el nombre y titulo 
    this.miPorfolio.name = inputEditPerfilName.value;
    this.miPorfolio.titulo = inputEditPerfilTitle.value;
    // Cierro ventana de edit
    document.getElementById('modal-edit-perfil')?.classList.toggle('modal-ventana-active');
  }

}
