import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MapModule} from '@rng/ui/map';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
