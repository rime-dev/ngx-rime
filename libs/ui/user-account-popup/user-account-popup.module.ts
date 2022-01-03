import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserAccountPopupComponent} from './user-account-popup.component';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
@NgModule({
  declarations: [UserAccountPopupComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
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
