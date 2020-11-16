import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PlatosComponent } from './platos/platos.component';
//pipes
import { CategoriaPipe } from './pipes/categoria.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeClientComponent,
    HomeAdminComponent,
    NavbarComponent,
    ClientesComponent,
    CategoriasComponent,
    PlatosComponent,
    CategoriaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
