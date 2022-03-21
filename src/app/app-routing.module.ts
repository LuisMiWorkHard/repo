import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificarComponent } from './docente/identificar/identificar.component';
import { EditorComponent } from './envio-masivo/correo/editor/editor.component';
import { PlantillaComponent } from './envio-masivo/correo/plantilla/plantilla.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
  path: 'login',
  component: PlantillaComponent,
  /* canActivate: [AuthGuardLoginService] */
  },
  {
    path: 'home',
    component: HomeComponent,
    /* canActivate: [AuthGuardService], */
    children: [
      {
        path: 'identificar',
        component: IdentificarComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'envio-masivo/correo/editor/:id',
        component: EditorComponent,
        /* canActivate: [AuthGuardService] */
      },
      {
        path: 'envio-masivo/correo/plantilla',
        component: PlantillaComponent,
        /* canActivate: [AuthGuardService] */
      }
    ]
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, 
  {
  path: 'login/:token',
  component: LoginComponent
  }, 
  {
  path: '**',
  component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
