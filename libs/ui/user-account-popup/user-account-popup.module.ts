import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RimeUserAccountPopupComponent } from './user-account-popup.component';
@NgModule({
  declarations: [RimeUserAccountPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule
  ],
  exports: [RimeUserAccountPopupComponent],
  providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
})
export class RimeUserAccountPopupModule {}
