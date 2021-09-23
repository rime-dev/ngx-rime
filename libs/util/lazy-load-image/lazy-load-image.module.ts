import {NgModule} from '@angular/core';
import {LazyLoadImageDirective} from './lazy-load-image.directive';

@NgModule({
  declarations: [LazyLoadImageDirective],
  exports: [LazyLoadImageDirective],
})
export class LazyLoadImageModule {}
