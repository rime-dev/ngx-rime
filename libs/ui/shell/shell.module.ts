import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {ShellComponent} from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    UserAccountPopupModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [ShellComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: MATERIAL_SANITY_CHECKS, useValue: false}],
})
export class ShellModule {}
