import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContribuyenteComponent } from './contribuyente.component';
import { DialogDatosUsuarioComponent } from '@pages/layout/components/header/components/dialog-datos-usuario/dialog-datos-usuario.component';
import { DatosContribuyenteComponent } from './components/datos-contribuyente/datos-contribuyente.component';

const routes: Routes = [
  { path: '', component: ContribuyenteComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detalle', component: DatosContribuyenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribuyenteRoutingModule {}
