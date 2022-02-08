import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule],
})
export class MapModule {}
