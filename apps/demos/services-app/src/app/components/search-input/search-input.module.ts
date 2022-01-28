import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {ProjectTypeModule} from '../../pipes/project-type/project-type.module';
import {ProjectTypePipe} from '../../pipes/project-type/project-type.pipe';
import {SearchInputComponent} from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    TranslocoModule,
    OverlayModule,
    RouterModule,
    MatChipsModule,
    ProjectTypeModule,
  ],
})
export class SearchInputModule {}
