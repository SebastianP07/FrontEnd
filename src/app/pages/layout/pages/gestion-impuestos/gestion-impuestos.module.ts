import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionImpuestosRoutingModule } from './gestion-impuestos-routing.module';
import { GestionImpuestosComponent } from './gestion-impuestos.component';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumenComponent } from './components/resumen/resumen.component';


@NgModule({
  declarations: [
    GestionImpuestosComponent,
    DialogCreacionEdicionComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    GestionImpuestosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionImpuestosModule { }
