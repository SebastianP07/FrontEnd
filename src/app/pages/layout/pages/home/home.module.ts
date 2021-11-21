import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRegistroTomaComponent } from './components/dialog-registro-toma/dialog-registro-toma.component';


@NgModule({
  declarations: [
    HomeComponent,
    DialogRegistroTomaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
