import { Component, OnInit } from '@angular/core';
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faTimes = faTimes;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faUser = faUser;
  faBars = faBars;

  myPorfolio:any = [];

  // Abrir menu desde el boton de hamburguesa en versiones moviles
  activarMenu(){
    document.getElementById('menu-navbar')?.classList.toggle('active');
    document.getElementById('menu-btn-close')?.classList.toggle('d-none');
    document.getElementById('menu-btn')?.classList.toggle('d-none');
  }

  // Cerrar menu desde el boton de la X en versiones moviles
  desactivarMenu(){
    document.getElementById('menu-navbar')?.classList.toggle('active');
    document.getElementById('menu-btn-close')?.classList.toggle('d-none');
    document.getElementById('menu-btn')?.classList.toggle('d-none');
  }

  // Abrir ventana login
  abrirLogin(){
    // Activo la ventana
    document.getElementById('modal-login')?.classList.toggle('modal-ventana-active');
    // Fuerzo el cierre y cambios necesarios de los botones de menu para evitar bugs
    document.getElementById('menu-btn-close')?.classList.add('d-none');
    document.getElementById('menu-navbar')?.classList.remove('active');
    document.getElementById('menu-btn')?.classList.remove('d-none');
    document.getElementById('menu-btn')?.classList.add('d-block');
    document.getElementById('menu-btn')?.classList.add('d-md-none');
  }

  // Sistema de deslogueo
  logout() {
    // Cambio los botones de logout x login
    document.getElementById('btn-login')?.classList.remove('d-none');
    document.getElementById('btn-logout')?.classList.add('d-none');
    // Desactivo los botones de edit
    document.querySelectorAll('.material-icons-outlined').forEach(icono => icono.classList.remove('d-block'));
    // Les devuelvo el redireccionamiento a los proyectos
    document.querySelectorAll('.proyecto A').forEach(el => el.classList.remove('pointer-event-none'));
    
  }
  constructor(private dataPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.dataPorfolio.getDatos().subscribe(data=>{
      this.myPorfolio = data;
    })
  }

}
