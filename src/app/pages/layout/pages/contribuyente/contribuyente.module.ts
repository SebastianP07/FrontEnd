import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContribuyenteRoutingModule } from './contribuyente-routing.module';
import { ContribuyenteComponent } from './contribuyente.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionBienesModule } from '../gestion-bienes/gestion-bienes.module';
import { DialogVerImpuestosComponent } from './components/dialog-ver-impuestos/dialog-ver-impuestos.component';
import { DatosContribuyenteComponent } from './components/datos-contribuyente/datos-contribuyente.component';

@NgModule({
  declarations: [
    ContribuyenteComponent,
    DialogCreacionEdicionComponent,
    DashboardComponent,
    DialogVerImpuestosComponent,
    DatosContribuyenteComponent,
  ],
  imports: [
    CommonModule,
    ContribuyenteRoutingModule,
    SharedModule,
    GestionBienesModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContribuyenteModule { }
