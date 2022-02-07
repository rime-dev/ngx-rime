import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ThemeSwitcherComponent} from './theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class ThemeSwitcherModule {}
