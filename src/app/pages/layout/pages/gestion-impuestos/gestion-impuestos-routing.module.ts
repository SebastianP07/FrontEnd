import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionImpuestosComponent } from './gestion-impuestos.component';

const routes: Routes = [{ path: '', component: GestionImpuestosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionImpuestosRoutingModule { }
