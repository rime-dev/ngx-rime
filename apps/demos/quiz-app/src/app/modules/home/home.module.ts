import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TargetCardComponent} from './components/target-card/target-card.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [HomeComponent, TargetCardComponent],
  imports: [CommonModule, HomeRoutingModule, MatButtonModule, MatCardModule],
})
export class HomeModule {}