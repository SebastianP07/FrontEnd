import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionBienesRoutingModule } from './gestion-bienes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarComerciosComponent } from './listar-comercios/listar-comercios.component';
import { ListarComerciosContribuyenteComponent } from './listar-comercios-contribuyente/listar-comercios-contribuyente.component';
import { ListarVehiculosComponent } from './listar-vehiculos/listar-vehiculos.component';
import { ListarVehiculosContribuyenteComponent } from './listar-vehiculos-contribuyente/listar-vehiculos-contribuyente.component';
import { ListarViviendasComponent } from './listar-viviendas/listar-viviendas.component';
import { ListarViviendasContribuyenteComponent } from './listar-viviendas-contribuyente/listar-viviendas-contribuyente.component';
import { DialogCreacionEdicionListaComerciosComponent } from './listar-comercios/components/dialog/dialog.component';
import { DialogCreacionEdicionListadoComercioContribuyenteComponent } from './listar-comercios-contribuyente/components/dialog/dialog.component';
import { DialogCreacionEdicionListadoVehiculosComponent } from './listar-vehiculos/components/dialog/dialog.component';
import { DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent } from './listar-vehiculos-contribuyente/components/dialog/dialog.component';
import { DialogCreacionEdicionListadoViviendasComponent } from './listar-viviendas/components/dialog/dialog.component';
import { DialogCreacionEdicionListadoViviendasContribuyenteComponent } from './listar-viviendas-contribuyente/components/dialog/dialog.component';
import { GestionBienesComponent } from './gestion-bienes.component';
import { DetalleContribuyenteComponent } from './detalle-contribuyente/detalle-contribuyente.component';
import { DetalleImpuestoBienComponent } from './detalle-impuesto-bien/detalle-impuesto-bien.component';
import { DetalleBienComponent } from './detalle-bien/detalle-bien.component';

@NgModule({
  declarations: [
    GestionBienesComponent,
    ListarComerciosComponent,
    ListarComerciosContribuyenteComponent,
    ListarVehiculosComponent,
    ListarVehiculosContribuyenteComponent,
    ListarViviendasComponent,
    ListarViviendasContribuyenteComponent,
    DialogCreacionEdicionListaComerciosComponent,
    DialogCreacionEdicionListadoComercioContribuyenteComponent,
    DialogCreacionEdicionListadoVehiculosComponent,
    DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent,
    DialogCreacionEdicionListadoViviendasComponent,
    DialogCreacionEdicionListadoViviendasContribuyenteComponent,
    DetalleContribuyenteComponent,
    DetalleImpuestoBienComponent,
    DetalleBienComponent
  ],
  exports: [
    GestionBienesComponent,
    ListarComerciosComponent,
    ListarComerciosContribuyenteComponent,
    ListarVehiculosComponent,
    ListarVehiculosContribuyenteComponent,
    ListarViviendasComponent,
    ListarViviendasContribuyenteComponent,
    DialogCreacionEdicionListaComerciosComponent,
    DialogCreacionEdicionListadoComercioContribuyenteComponent,
    DialogCreacionEdicionListadoVehiculosComponent,
    DialogCreacionEdicionListadoVehiculosCOntribuyenteComponent,
    DialogCreacionEdicionListadoViviendasComponent,
    DialogCreacionEdicionListadoViviendasContribuyenteComponent
  ],
  imports: [
    CommonModule,
    GestionBienesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GestionBienesModule { }
