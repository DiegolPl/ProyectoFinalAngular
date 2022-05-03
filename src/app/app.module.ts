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
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
