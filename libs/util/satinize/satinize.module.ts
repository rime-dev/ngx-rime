import {NgModule} from '@angular/core';
import {SatinizePipe} from './satinize.pipe';

@NgModule({
  declarations: [SatinizePipe],
  exports: [SatinizePipe],
})
export class SatinizeModule {}
