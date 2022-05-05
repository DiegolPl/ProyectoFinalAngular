import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private dataPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.dataPorfolio.getDatos().subscribe(data => {
      this.myPorfolio = data;
    })
  }

  myPorfolio: any;

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

  subirLabelUser(){
    let userInput = document.getElementById('user-input') as HTMLInputElement;
    if( userInput.value.length > 0){
      document.getElementById('label-login-user')?.classList.add('label-top');
    }else{
      document.getElementById('label-login-user')?.classList.remove('label-top');
    }
  }

  subirLabelPass(){
    let passInput = document.getElementById('pass-input') as HTMLInputElement;
    if( passInput.value.length > 0){
      document.getElementById('label-login-pass')?.classList.add('label-top');
    }else{
      document.getElementById('label-login-pass')?.classList.remove('label-top');
    }
  }

  login(){
    let userInput = document.getElementById('user-input') as HTMLInputElement;
    let passInput = document.getElementById('pass-input') as HTMLInputElement;
    let userValue = userInput.value;
    let passValue = passInput.value;

    if(userValue === this.myPorfolio.credenciales.username && passValue === this.myPorfolio.credenciales.password){
      document.querySelectorAll('.material-icons-outlined')?.forEach(icono => icono.classList.add('d-block'));
      document.getElementById('modal-login')?.classList.toggle('modal-ventana-active');
      userValue = "";
      passValue = "";
      document.getElementById('label-login-user')?.classList.remove('label-top');
      document.getElementById('label-login-pass')?.classList.remove('label-top');
      document.getElementById('btn-login')?.classList.toggle('d-none');
      document.getElementById('btn-logout')?.classList.toggle('d-none');
      document.getElementById('btn-logout')?.classList.toggle('d-block');
      document.querySelectorAll('A').forEach(el => el.classList.add('pointer-event-none'));
    }
  }


  

}
