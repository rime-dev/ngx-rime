import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LazyLoadImageModule} from './lazy-load-image/lazy-load-image.module';

@NgModule({
  imports: [CommonModule, LazyLoadImageModule],
  exports: [LazyLoadImageModule],
})
export class UtilModule {}
