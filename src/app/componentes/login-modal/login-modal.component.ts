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

  // Cerrar ventana modal de login
  cerrarLogin(){
    // Cierro la ventana sacandole la clase
    document.getElementById('modal-login')?.classList.remove('modal-ventana-active');
    // Vacio los inputs
    let userInput = document.getElementById('user-input') as HTMLInputElement;
    let passInput = document.getElementById('pass-input') as HTMLInputElement;
    userInput.value = '';
    passInput.value = '';
    // Vuelvo a bajar los labels (cambio estetico para que no queden flotando)
    document.getElementById('label-login-user')?.classList.remove('label-top');
    document.getElementById('label-login-pass')?.classList.remove('label-top');
  }

  // Subo los labels cuando detectan una tecla presionada para que no se superpongan (estetico)
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

  // Sistema de login
  login(){
    // Tomo los valores
    let userInput = document.getElementById('user-input') as HTMLInputElement;
    let passInput = document.getElementById('pass-input') as HTMLInputElement;
    let userValue = userInput.value;
    let passValue = passInput.value;

    // Los comparo con mi json para validar
    if(userValue === this.myPorfolio.credenciales.username && passValue === this.myPorfolio.credenciales.password){
      // Activo los iconos de edit
      document.querySelectorAll('.menu-edit')?.forEach(icono => icono.classList.add('d-block'));
      // Cierro la ventana de login
      document.getElementById('modal-login')?.classList.toggle('modal-ventana-active');
      // Elimino los valores de dicha ventana
      userValue = "";
      passValue = "";
      // Remuevo el efecto de subir el label
      document.getElementById('label-login-user')?.classList.remove('label-top');
      document.getElementById('label-login-pass')?.classList.remove('label-top');
      // Quito boton de login y habilito el de logout
      document.getElementById('btn-login')?.classList.toggle('d-none');
      document.getElementById('btn-logout')?.classList.toggle('d-none');
      document.getElementById('btn-logout')?.classList.toggle('d-flex');
      // Les quito la posibilidad de redireccion a los links de los proyectos
      document.querySelectorAll('.proyecto A').forEach(el => el.classList.add('pointer-event-none'));

      

    }else {
      // Si se equivocan en el usuario o contraseña se los hago saber
      alert('Usuario y/o contraseña inválida');
    }
  }


  

}
