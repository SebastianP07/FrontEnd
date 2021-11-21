import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage/storage.service';
import { MaterialModule } from './modules/material.module';
import { PrintService } from './services/print/print.service';
@NgModule({
  declarations: [],
  providers: [StorageService, PrintService],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule {
}
