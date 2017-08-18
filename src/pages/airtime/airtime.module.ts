import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { AirtimePage } from './airtime';

@NgModule({
  declarations: [
    AirtimePage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(AirtimePage),
  ],
})
export class AirtimePageModule {}
