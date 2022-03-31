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
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {RimeUserAccountPopupModule} from '@ngx-rime/ui/user-account-popup';
import {RimeShellComponent} from './shell.component';

@NgModule({
  declarations: [RimeShellComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    RimeUserAccountPopupModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [RimeShellComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: MATERIAL_SANITY_CHECKS, useValue: false}],
})
export class RimeShellModule {}
