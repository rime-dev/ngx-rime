import {NgModule} from '@angular/core';

import {RimeSatinizePipe} from './satinize.pipe';

@NgModule({
  declarations: [RimeSatinizePipe],
  exports: [RimeSatinizePipe],
})
export class RimeSatinizeModule {}
