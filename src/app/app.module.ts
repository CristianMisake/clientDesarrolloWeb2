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
import { MenuComponent } from './menu/menu.component';
import { PedidoComponent } from './pedido/pedido.component';
//pipes
import { CategoriaPipe } from './pipes/categoria.pipe';
import { PlatoPipe } from './pipes/platos.pipe';
import { PlatoSeletedPipe } from './pipes/platosSeleted.pipe';
import { BienvenidosComponent } from './bienvenidos/bienvenidos.component';

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
    MenuComponent,
    PedidoComponent,
    CategoriaPipe,
    PlatoPipe,
    PlatoSeletedPipe,
    BienvenidosComponent,
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
