import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ShellModule} from '@rng/ui/shell';
import {AppRoutingModule} from './app-routing.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
