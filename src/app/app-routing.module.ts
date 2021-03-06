import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { LoginComponent } from './login/login.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
//sub componentes admin
import { ClientesComponent } from './clientes/clientes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PlatosComponent } from './platos/platos.component';
//sub componentes cliente
import { MenuComponent } from './menu/menu.component';
import { BienvenidosComponent } from './bienvenidos/bienvenidos.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeClientComponent,
  children: [
    {
      path: '', // child route path
      component: BienvenidosComponent, // child route component that the router renders
    },
    {
      path: 'menu', // child route path
      component: MenuComponent, // child route component that the router renders
    }
   ]
  },
  { path: 'homeAdmin', component: HomeAdminComponent,
  children: [
    {
      path: '', // child route path
      component: BienvenidosComponent, // child route component that the router renders
    },
    {
      path: 'clientes', // child route path
      component: ClientesComponent, // child route component that the router renders
    },
    {
      path: 'categorias', // child route path
      component: CategoriasComponent, // child route component that the router renders
    },
    {
      path: 'platos', // child route path
      component: PlatosComponent, // child route component that the router renders
    }
   ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
