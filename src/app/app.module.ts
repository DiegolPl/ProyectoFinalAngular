import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginModalComponent } from './componentes/login-modal/login-modal.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ExperienciasComponent } from './componentes/experiencias/experiencias.component';
import { EducacionesComponent } from './componentes/educaciones/educaciones.component';
import { HysComponent } from './componentes/hys/hys.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule } from '@angular/forms';
// Importo el modulo que me permitira aplicar en mis servicios las llamadas Http para obtener los recursos del servidor
import { HttpClientModule } from '@angular/common/http'; 
import { PorfolioService } from './servicios/porfolio.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    BannerComponent,
    PerfilComponent,
    ExperienciasComponent,
    EducacionesComponent,
    HysComponent,
    ProyectosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PorfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
