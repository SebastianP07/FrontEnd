import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contribuyente } from '@core/models/contribuyente.model';
import { Impuesto } from '@core/models/impuesto.model';
import { GestionContribuyentesService } from '@core/services/gestion-contribuyentes/gestion-contribuyentes.service';
import { GestionImpuestoService } from '@core/services/gestion-impuestos/gestion-impuestos.service';
import { DialogCreacionEdicionComponent } from './components/dialog-creacion-edicion/dialog-creacion-edicion.component';
import { DialogVerImpuestosComponent } from './components/dialog-ver-impuestos/dialog-ver-impuestos.component';
@Component({
  selector: 'app-contribuyente',
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.scss']
})
export class ContribuyenteComponent implements OnInit {
  displayedColumns: string[] = ['Tipo identificación', 'Identificación', 'Nombres', 'Correo electronico', 'Dirección', 'Telefono', 'Impuestos', ' '];
  dataSource!: Contribuyente[];

  constructor(public dialog: MatDialog, private gestionContribuyentesService: GestionContribuyentesService, private gestionImpuestosService: GestionImpuestoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getContribuyentes();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  getContribuyentes(): void {
    this.gestionContribuyentesService.getContribuyentes().subscribe((response: Contribuyente[]) => {
      this.dataSource = response;
    });
  }

  accionRegistro(registro?: Contribuyente): void {
    const dialogRef = this.dialog.open(DialogCreacionEdicionComponent, {
      width: '800px',
      panelClass: 'custom-modalbox',
      data: {
        headerDialog: `Contribuyente`,
        contribuyente: registro,
        imagen: '',
        accion: registro ? 'editar' : 'agregar',
        acceptDialog: registro ? 'Editar' : 'Registrar',
        cancelDialog: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContribuyentes();
    });
  }

  verImpuestos(registro: Contribuyente): void {
    this.gestionImpuestosService.getImpuestosContribuyente(registro.numeroIdentificacion).subscribe((response: Impuesto[]) => {
      if (response.length > 0) {
        const dialogRef = this.dialog.open(DialogVerImpuestosComponent, {
          width: '2000px',
          panelClass: 'custom-modalbox',
          data: {
            datosRegistro: response,
            cancelDialog: 'Cancelar'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      } else {
        this.openSnackBar('Usuario sin impuestos a mostrar', 'X');
      }
    });
  }

}
