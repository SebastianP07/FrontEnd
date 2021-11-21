import { ListarComerciosComponent } from './listar-comercios/listar-comercios.component';
import { ListarViviendasComponent } from './listar-viviendas/listar-viviendas.component';
import { ListarVehiculosComponent } from './listar-vehiculos/listar-vehiculos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionBienesComponent } from './gestion-bienes.component';

const routes: Routes = [
  { path: '', component: GestionBienesComponent },
  { path: 'listar/vehiculos', component: ListarVehiculosComponent },
  { path: 'listar/viviendas', component: ListarViviendasComponent },
  { path: 'listar/comercios', component: ListarComerciosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionBienesRoutingModule {}
