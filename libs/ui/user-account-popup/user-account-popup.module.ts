import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserAccountPopupComponent} from './user-account-popup.component';
@NgModule({
  declarations: [UserAccountPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [UserAccountPopupComponent],
  providers: [{provide: MATERIAL_SANITY_CHECKS, useValue: false}],
})
export class UserAccountPopupModule {}
