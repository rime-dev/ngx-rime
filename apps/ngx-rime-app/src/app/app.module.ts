import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RimeShellModule } from '@ngx-rime/ui/shell';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RimeShellModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
