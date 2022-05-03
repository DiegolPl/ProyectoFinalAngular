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

  hidden = false;
  hiddenMenuBtn = false;
  hiddenCloseBtn = true;

  activarMenu(){
    this.hidden = true;
    this.hiddenMenuBtn = true;
    this.hiddenCloseBtn = false;
  }

  desactivarMenu(){
    this.hidden = false;
    this.hiddenMenuBtn = false;
    this.hiddenCloseBtn = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
