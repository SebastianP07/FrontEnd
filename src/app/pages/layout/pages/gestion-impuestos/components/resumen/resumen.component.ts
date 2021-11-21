import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  @Input() data!: { cantidad: number, descipcion: string };
  constructor() { }

  ngOnInit(): void {
  }

}
