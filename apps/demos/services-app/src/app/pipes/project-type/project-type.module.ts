import {NgModule} from '@angular/core';
import {ProjectTypePipe} from './project-type.pipe';

@NgModule({
  declarations: [ProjectTypePipe],
  providers: [ProjectTypePipe],
  exports: [ProjectTypePipe],
})
export class ProjectTypeModule {}
