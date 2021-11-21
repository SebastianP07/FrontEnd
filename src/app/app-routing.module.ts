import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from '@core/guards/login/login.guard';
import {AuthComponent} from '@pages/auth/auth.component';
import {LayoutComponent} from '@pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'impuestos',
        pathMatch: 'full',
      },
      {
        path: 'gestion-impuestos',
        loadChildren: () =>
          import(
            '@pages/layout/pages/gestion-impuestos/gestion-impuestos.module'
            ).then((m) => m.GestionImpuestosModule),
      },
      {
        path: 'contribuyente',
        loadChildren: () =>
          import('@pages/layout/pages/contribuyente/contribuyente.module').then(
            (m) => m.ContribuyenteModule
          ),
      },
      {
        path: 'gestion-bienes',
        loadChildren: () =>
          import(
            '@pages/layout/pages/gestion-bienes/gestion-bienes.module'
            ).then((m) => m.GestionBienesModule),
      },
      {
        path: 'impuestos',
        loadChildren: () =>
          import('@pages/layout/pages/impuestos/impuestos.module').then(
            (m) => m.ImpuestosModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
