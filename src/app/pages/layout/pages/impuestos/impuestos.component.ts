import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Impuesto } from '@core/models/impuesto.model';
import { GestionImpuestoService } from '@core/services/gestion-impuestos/gestion-impuestos.service';
import { UserService } from '@core/services/user/user.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DetalleBienComponent } from '../gestion-bienes/detalle-bien/detalle-bien.component';
import { ConciliacionComponent } from './components/conciliacion/conciliacion.component';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { DialogPagarComponent } from './components/dialog-pagar/dialog-pagar.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss']
})
export class ImpuestosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['IdImpuesto', 'TipoBien', 'Estado', 'Pagar', 'Pagado', 'FechaLimitePagoOrdinario', 'FechaLimitePagoExtraOrdinario', 'DiasMora', 'VerMas', 'Reclamo', 'Conciliacion'];
  dataSource: Impuesto[] = [];
  observableUser!: Subscription;
  dataUser!: any;
  constructor(public dialog: MatDialog, private gestionImpuestosService: GestionImpuestoService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDataUser();
    this.getImpuestosContribuyente();
  }

  ngOnDestroy(): void {
    this.observableUser.unsubscribe();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  getDataUser(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
    });
  }

  getImpuestosContribuyente(): void {
    this.gestionImpuestosService.getImpuestosContribuyente(this.dataUser.responseDataUser.numeroIdentificacion).subscribe((response: Impuesto[]) => {
      this.dataSource = response;
    });
  }

  verDetalle(registro: any) {
    const dialogRef = this.dialog.open(DialogCreacionEdicionComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        datosRegistro: registro,
        cancelDialog: 'Cancelar',
        idImpuesto: this.obtenerIdImpuesto(registro)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  obtenerIdImpuesto(registro: any): string {
    return `${registro.id}${registro.bien.id}${registro.impuesto.id}${registro.bien.contribuyente.numeroIdentificacion}`;
  }

  verDetalleBien(bien: any): void {
    this.dialog.open(DetalleBienComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        datosRegistro: bien,
        cancelDialog: 'Cancelar',
      }
    });
  }

  validarFecha(fecha: string): boolean {
    return new Date(fecha) < new Date();
  }

  realizarReclamo(bien: any): void {
    this.dialog.open(ReclamoComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        datosRegistro: {
          bien,
          idImpuesto: this.obtenerIdImpuesto(bien)
        },
        cancelDialog: 'Cancelar',
      }
    });
  }

  pagarImpuesto(impuesto: any): void {
    if (!impuesto.pagado) {
      const dialogRef = this.dialog.open(DialogPagarComponent, {
        width: '800px',
        panelClass: 'custom-modalbox',
        data: {
          datosRegistro: {
            impuesto,
            idImpuesto: this.obtenerIdImpuesto(impuesto)
          },
          cancelDialog: 'Cancelar',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'PAGAR') {
          this.openSnackBar('Pago realizado con éxito!', 'X');
          this.dataSource.map(elem => {
            if (elem.id === impuesto.id) {
              elem.pagado = true;
            }
          })
        }
      });
    }
  }

  validarDiasMora(fecha: any): number {
    const dias = moment(new Date()).diff(moment(fecha), 'days');
    return dias > 0 ? dias : 0;
  }

  realizarConciliacion(impuesto: any): void {
    this.dialog.open(ConciliacionComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        datosRegistro: {
          impuesto,
        },
        cancelDialog: 'Cancelar',
      }
    });
  }
}
