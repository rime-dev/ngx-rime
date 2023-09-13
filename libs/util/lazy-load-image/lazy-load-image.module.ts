import {NgModule} from '@angular/core';

import {RimeLazyLoadImageDirective} from './lazy-load-image.directive';

@NgModule({
  declarations: [RimeLazyLoadImageDirective],
  exports: [RimeLazyLoadImageDirective],
})
export class RimeLazyLoadImageModule {}
