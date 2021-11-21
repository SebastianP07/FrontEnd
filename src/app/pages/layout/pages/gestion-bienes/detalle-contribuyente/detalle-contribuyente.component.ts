import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contribuyente } from '@core/models/contribuyente.model';
export interface DialogData {
  headerDialog: string;
  contribuyente: any;
  tipo: string;
  acceptDialog: string;
}
@Component({
  selector: 'app-detalle-contribuyente',
  templateUrl: './detalle-contribuyente.component.html',
  styleUrls: ['./detalle-contribuyente.component.scss']
})
export class DetalleContribuyenteComponent implements OnInit {
  displayedColumns: string[] = [
    'nombres',
    'identificacion',
    'correoElectronico',
    'direccion',
  ];
  dataSource: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetalleContribuyenteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  ) { }

  ngOnInit(): void {
    this.dataSource.push(this.dialogData.contribuyente.contribuyente);
  }

}
