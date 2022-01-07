import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {TeamRoutingModule} from './team-routing.module';
import {TeamComponent} from './team.component';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class TeamModule {}
