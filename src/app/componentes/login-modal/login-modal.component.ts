import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  faTimes = faTimes;

  cerrarLogin(){
    document.getElementById('modal-login')?.classList.remove('modal-ventana-active');
    let userInput = document.getElementById('user-input') as HTMLInputElement;
    let passInput = document.getElementById('pass-input') as HTMLInputElement;
    userInput.value = '';
    passInput.value = '';
    document.getElementById('label-login-user')?.classList.remove('label-top');
    document.getElementById('label-login-pass')?.classList.remove('label-top');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
