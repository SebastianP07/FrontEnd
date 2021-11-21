import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpuestosRoutingModule } from './impuestos-routing.module';
import { ImpuestosComponent } from './impuestos.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';
import { DialogPagarComponent } from './components/dialog-pagar/dialog-pagar.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ConciliacionComponent } from './components/conciliacion/conciliacion.component';


@NgModule({
  declarations: [
    ImpuestosComponent,
    DialogCreacionEdicionComponent,
    ReclamoComponent,
    DialogPagarComponent,
    ConciliacionComponent
  ],
  imports: [
    CommonModule,
    ImpuestosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxBarcodeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImpuestosModule { }
