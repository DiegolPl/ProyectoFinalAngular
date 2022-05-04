import { Component, OnInit } from '@angular/core';
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';


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

  activarMenu(){
    document.getElementById('menu-navbar')?.classList.toggle('active');
    document.getElementById('menu-btn-close')?.classList.toggle('d-none');
    document.getElementById('menu-btn')?.classList.toggle('d-none');
  }

  desactivarMenu(){
    document.getElementById('menu-navbar')?.classList.toggle('active');
    document.getElementById('menu-btn-close')?.classList.toggle('d-none');
    document.getElementById('menu-btn')?.classList.toggle('d-none');
  }

  abrirLogin(){
    document.getElementById('modal-login')?.classList.toggle('modal-ventana-active');
    document.getElementById('menu-btn-close')?.classList.add('d-none');
    document.getElementById('menu-navbar')?.classList.remove('active');
    document.getElementById('menu-btn')?.classList.remove('d-none');
    document.getElementById('menu-btn')?.classList.add('d-block');
    document.getElementById('menu-btn')?.classList.add('d-md-none');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
