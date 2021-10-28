import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {TargetCardComponent} from './components/target-card/target-card.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, TargetCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
