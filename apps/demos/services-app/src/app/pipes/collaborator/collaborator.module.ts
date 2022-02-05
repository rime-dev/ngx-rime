import {NgModule} from '@angular/core';
import {CollaboratorPipe} from './collaborator.pipe';

@NgModule({
  declarations: [CollaboratorPipe],
  providers: [CollaboratorPipe],
  exports: [CollaboratorPipe],
})
export class CollaboratorPipeModule {}
