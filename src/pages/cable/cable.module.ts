import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { CablePage } from './cable';

@NgModule({
  declarations: [
    CablePage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(CablePage),
  ],
})
export class CablePageModule {}
